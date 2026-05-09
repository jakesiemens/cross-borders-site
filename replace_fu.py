import os

file_path = "draft/field-updates.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    '<a href="field-updates.html" id="nav-field-updates">Field Updates</a>': '<!-- <a href="field-updates.html" id="nav-field-updates">Field Updates</a> -->',
    '<a href="field-updates.html">Field Updates</a>': '<!-- <a href="field-updates.html">Field Updates</a> -->',
    '<li><a href="field-updates.html">Field Updates</a></li>': '<!-- <li><a href="field-updates.html">Field Updates</a></li> -->'
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(file_path, "w", encoding="utf-8", newline="") as f:
    f.write(content)
print("Done")
