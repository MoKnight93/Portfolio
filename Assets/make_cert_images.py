"""Make a JPG preview for each certificate PDF, skipping ones that already exist.
Usage (from your project folder):
    pip install pymupdf
    python make_cert_images.py                 # only creates missing images
    python make_cert_images.py --force         # re-creates everything
PDF   : Assets/Pdf/Certificates/Certificate N.pdf
Image : Assets/Images/Certificates/Certificate N.jpg
"""
import sys
from pathlib import Path
import fitz  # PyMuPDF

src = Path("Assets/Pdf/Certificates")
dst = Path("Assets/Images/Certificates")
force = "--force" in sys.argv
WIDTH = 900  # px, plenty for a carousel card
dst.mkdir(parents=True, exist_ok=True)

made = skipped = 0
for pdf in sorted(src.glob("Certificate *.pdf")):
    out = dst / (pdf.stem + ".jpg")
    if out.exists() and not force:
        skipped += 1
        continue
    page = fitz.open(pdf)[0]
    zoom = WIDTH / page.rect.width
    page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False).save(out, jpg_quality=80)
    print("made", out, out.stat().st_size // 1024, "KB")
    made += 1
print(f"done: {made} created, {skipped} skipped (already existed)")
