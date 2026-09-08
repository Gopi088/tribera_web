"""Print the existing navbar wordmark as SVG paths (fontTools + uharfbuzz)."""
from io import BytesIO
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

font = TTFont(Path(__file__).resolve().parents[1] / 'public/fonts/figtree-800.woff2')
font.flavor = None
buffer = BytesIO()
font.save(buffer)
face = hb.Face(buffer.getvalue())
shaper = hb.Font(face)
glyphs = font.getGlyphSet()
names = font.getGlyphOrder()
x = 0
print('<svg xmlns="http://www.w3.org/2000/svg" width="76" height="20" viewBox="0 0 76 20" aria-hidden="true" focusable="false">')
print('  <g transform="translate(0 17) scale(.02 -.02)">')
# The old dot was a separate inline element, so shape it independently.
for text, color in [('tribera', '#131313'), ('.', '#da0007')]:
    run = hb.Buffer()
    run.add_str(text)
    run.guess_segment_properties()
    hb.shape(shaper, run)
    pen = SVGPathPen(glyphs)
    for info, position in zip(run.glyph_infos, run.glyph_positions):
        offset = (1, 0, 0, 1, x + position.x_offset, position.y_offset)
        glyphs[names[info.codepoint]].draw(TransformPen(pen, offset))
        x += position.x_advance - 55  # Existing 20px type, -.055em tracking.
    print(f'    <path fill="{color}" d="{pen.getCommands()}" />')
print('  </g>\n</svg>')
