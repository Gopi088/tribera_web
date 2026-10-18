import copy
import importlib.util
import io
import json
from pathlib import Path
import unittest
import xml.etree.ElementTree as ET
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("workbook", ROOT / "scripts/update_bug_workbook.py")
workbook = importlib.util.module_from_spec(spec)
spec.loader.exec_module(workbook)


class WorkbookTests(unittest.TestCase):
    def setUp(self):
        self.manifest = json.loads((ROOT / "docs/excel-bug-status.json").read_text())
        self.original = (ROOT / self.manifest["workbook"]).read_bytes()

    def test_original_backup_preservation_and_real_review_gate(self):
        path = ROOT / self.manifest["workbook"]
        backup = path.with_name(path.stem + ".before-status-update.xlsx").read_bytes()
        result = workbook.render(backup, self.manifest)
        workbook.validate(backup, result, self.manifest)
        workbook.validate(backup, self.original, self.manifest)

    def test_round_trip_preserves_workbook(self):
        result = workbook.render(self.original, self.manifest)
        workbook.validate(self.original, result, self.manifest)
        self.assertEqual(workbook.render(result, self.manifest), result)
        with ZipFile(io.BytesIO(result)) as archive:
            sheet = ET.fromstring(archive.read(workbook.SHEET))
            self.assertEqual(sheet.find(workbook.tag("dimension")).get("ref"), f"A1:L{self.manifest.get('last_row', 47)}")
            validations = sheet.find(workbook.tag("dataValidations"))
            self.assertTrue(any(v.get("sqref") == f"F2:F{self.manifest.get('last_row', 47)}" for v in validations))

    def test_unreviewed_row_is_rejected(self):
        self.manifest["records"][0]["claude_review"] = "Awaiting review"
        with self.assertRaisesRegex(AssertionError, "Claude review required"):
            workbook.render(self.original, self.manifest)

    def test_changed_issue_is_rejected(self):
        self.manifest["records"][0]["description"] += " changed"
        with self.assertRaisesRegex(AssertionError, "source changed"):
            workbook.render(self.original, self.manifest)

    def test_missing_row_is_rejected(self):
        self.manifest["records"].pop()
        with self.assertRaisesRegex(AssertionError, "all original rows"):
            workbook.render(self.original, self.manifest)

    def test_unknown_status_is_rejected(self):
        self.manifest["records"][0]["status"] = "Deployed and approved"
        with self.assertRaises(AssertionError):
            workbook.render(self.original, self.manifest)

    def test_future_approved_update_keeps_original_status(self):
        result = workbook.render(self.original, self.manifest)
        updated = copy.deepcopy(self.manifest)
        record = next(r for r in updated["records"] if r["row"] == 23)
        record["expected_status"] = record["status"]
        record["status"] = "Verified (local)"
        result = workbook.render(result, updated)
        with ZipFile(io.BytesIO(result)) as archive:
            rows = workbook.rows_of(ET.fromstring(archive.read(workbook.SHEET)))
            self.assertEqual(workbook.cell_text(workbook.cells_of(rows[23])["L23"]), record["previous_status"])


if __name__ == "__main__":
    unittest.main()
