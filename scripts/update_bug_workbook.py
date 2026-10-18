"""Update the reviewed XLSX without reserializing unrelated workbook parts."""

import argparse
import io
import json
import os
from pathlib import Path
import tempfile
import xml.etree.ElementTree as ET
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
ET.register_namespace("", NS)
ET.register_namespace("r", REL)
SHEET = "xl/worksheets/sheet1.xml"
TABLE = "xl/tables/table1.xml"
HEADERS = ["Date", "Page", "Type", "Description", "Recommendation", "Status",
           "Fix / Outcome", "Verification Evidence", "Claude Review", "Reviewed On",
           "Next Action", "Previous Status"]
STATUSES = ["Verified (local)", "Verified - existing", "Reviewed - no defect",
            "Reviewed - coverage", "Pending - owner", "Pending - legal",
            "Pending - deployment", "Deferred - enhancement"]
FIELDS = ["date", "page", "type", "description", "recommendation"]


def tag(name):
    return f"{{{NS}}}{name}"


def cell_text(cell):
    if cell is None:
        return ""
    if cell.get("t") == "inlineStr":
        return "".join(cell.find(tag("is")).itertext())
    if cell.get("t") == "s":
        raise ValueError("Shared-string input needs an explicit migration; refusing to guess")
    value = cell.find(tag("v"))
    return value.text if value is not None else ""


def rows_of(sheet):
    return {int(row.get("r")): row for row in sheet.find(tag("sheetData"))}


def cells_of(row):
    return {cell.get("r"): cell for cell in row}


def put(row, column, value, style="17"):
    address = f"{column}{row.get('r')}"
    cell = cells_of(row).get(address)
    if cell is None:
        cell = ET.SubElement(row, tag("c"), {"r": address, "s": style})
    if cell.find(tag("f")) is not None:
        raise ValueError(f"Refusing to replace formula at {address}")
    for child in list(cell):
        cell.remove(child)
    cell.set("t", "inlineStr")
    text = ET.SubElement(ET.SubElement(cell, tag("is")), tag("t"))
    text.text = value
    if value != value.strip():
        text.set("{http://www.w3.org/XML/1998/namespace}space", "preserve")


def render(original, manifest):
    records = manifest["records"]
    last_row = manifest.get("last_row", 47)
    assert [r["row"] for r in records] == list(range(2, last_row + 1)), "Expected all original rows in order"
    table_range = f"A1:L{last_row}"
    with ZipFile(io.BytesIO(original)) as archive:
        sheet = ET.fromstring(archive.read(SHEET))
        table = ET.fromstring(archive.read(TABLE))
        rows = rows_of(sheet)
        assert list(rows) == list(range(1, last_row + 1)), "Workbook rows changed; reconcile before updating"
        header = cells_of(rows[1])
        for index, name in enumerate(HEADERS):
            cell = header.get(f"{chr(65 + index)}1")
            if cell is not None:
                assert cell_text(cell) == name, "Unexpected column: do not overwrite user data"
        for record in records:
            number = record["row"]
            cells = cells_of(rows[number])
            for index, field in enumerate(FIELDS):
                assert cell_text(cells[f"{chr(65 + index)}{number}"]) == record[field], f"R{number}: source changed"
            assert record["status"] in STATUSES
            assert record["reviewed_on"] and record["claude_review"].startswith("ACCEPT:"), f"R{number}: Claude review required"
            expected = record.get("expected_status", record["previous_status"])
            assert cell_text(cells[f"F{number}"]) in (expected, record["status"]), f"R{number}: status changed by someone else"
            assert cell_text(cells.get(f"L{number}")) in ("", record["previous_status"]), f"R{number}: previous status conflicts"
            values = [record["status"], record["outcome"], record["evidence"],
                      record["claude_review"], record["reviewed_on"], record["next_action"],
                      record["previous_status"]]
            for index, value in enumerate(values, 5):
                put(rows[number], chr(65 + index), value)
        for index, name in enumerate(HEADERS[6:], 6):
            put(rows[1], chr(65 + index), name, style="15")
        sheet.find(tag("dimension")).set("ref", table_range)
        cols = sheet.find(tag("cols"))
        for index, width in enumerate([68, 58, 54, 15, 60, 30], 7):
            matches = [col for col in cols if col.get("min") == str(index)]
            if not matches:
                ET.SubElement(cols, tag("col"), {"min": str(index), "max": str(index),
                    "width": str(width), "customWidth": "1", "style": "17"})
        for validation in sheet.find(tag("dataValidations")):
            if validation.get("sqref", "").startswith("F2:"):
                validation.set("sqref", f"F2:F{last_row}")
                validation.find(tag("formula1")).text = '"' + ",".join(STATUSES) + '"'
        table.set("ref", table_range)
        columns = table.find(tag("tableColumns"))
        for child in list(columns):
            columns.remove(child)
        columns.set("count", str(len(HEADERS)))
        for index, name in enumerate(HEADERS, 1):
            ET.SubElement(columns, tag("tableColumn"), {"id": str(index), "name": name})
        auto_filter = table.find(tag("autoFilter"))
        if auto_filter is None:
            auto_filter = ET.Element(tag("autoFilter"))
            table.insert(0, auto_filter)
        auto_filter.set("ref", table_range)
        replacements = {SHEET: ET.tostring(sheet, encoding="utf-8"),
                        TABLE: ET.tostring(table, encoding="utf-8")}
        result = io.BytesIO()
        with ZipFile(result, "w") as output:
            for item in archive.infolist():
                output.writestr(item, replacements.get(item.filename, archive.read(item.filename)))
    updated = result.getvalue()
    validate(original, updated, manifest)
    return updated


def validate(original, updated, manifest):
    with ZipFile(io.BytesIO(original)) as before, ZipFile(io.BytesIO(updated)) as after:
        assert after.testzip() is None
        assert before.namelist() == after.namelist(), "ZIP parts changed"
        for name in before.namelist():
            if name not in (SHEET, TABLE):
                assert before.read(name) == after.read(name), f"Unrelated workbook part changed: {name}"
        old_sheet = ET.fromstring(before.read(SHEET))
        new_sheet = ET.fromstring(after.read(SHEET))
        old_rows, new_rows = rows_of(old_sheet), rows_of(new_sheet)
        for number, row in old_rows.items():
            for address, cell in cells_of(row).items():
                if address[0] in "ABCDE":
                    assert ET.tostring(cell) == ET.tostring(cells_of(new_rows[number])[address]), address
        for record in manifest["records"]:
            number = record["row"]
            cells = cells_of(new_rows[number])
            for column, field in zip("FGHIJKL", ["status", "outcome", "evidence", "claude_review",
                                                "reviewed_on", "next_action", "previous_status"]):
                assert cell_text(cells[f"{column}{number}"]) == record[field], f"R{number}: {field}"
        for name in ["hyperlinks", "sheetViews", "pageMargins"]:
            assert ET.tostring(old_sheet.find(tag(name))) == ET.tostring(new_sheet.find(tag(name))), name
        new_table = ET.fromstring(after.read(TABLE))
        assert new_table.get("ref") == f"A1:L{manifest.get('last_row', 47)}"
        assert new_table.find(tag("tableColumns")).get("count") == "12"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--write", action="store_true", help="Back up then atomically update the workbook")
    args = parser.parse_args()
    manifest = json.loads((ROOT / "docs/excel-bug-status.json").read_text())
    workbook = ROOT / manifest["workbook"]
    original = workbook.read_bytes()
    updated = render(original, manifest)
    if args.write:
        backup = workbook.with_name(workbook.stem + ".before-status-update.xlsx")
        if not backup.exists():
            with backup.open("xb") as target:
                target.write(original)
        assert workbook.read_bytes() == original, "Workbook changed during reconciliation"
        handle, temporary = tempfile.mkstemp(suffix=".xlsx", dir=workbook.parent)
        try:
            with os.fdopen(handle, "wb") as target:
                target.write(updated)
            os.chmod(temporary, workbook.stat().st_mode)
            os.replace(temporary, workbook)
        finally:
            if os.path.exists(temporary):
                os.unlink(temporary)
        validate(original, workbook.read_bytes(), manifest)
        print(f"Updated {workbook}; original backed up at {backup}")
    counts = {}
    for record in manifest["records"]:
        counts[record["status"]] = counts.get(record["status"], 0) + 1
    print(json.dumps({"rows": len(manifest["records"]), "statuses": counts, "preserved": "A-E, original statuses, hyperlinks, styles, all other ZIP parts"}, indent=2))


if __name__ == "__main__":
    main()
