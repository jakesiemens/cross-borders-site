import os

file_path = "draft/missionaries.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    'href="pillars/bible.html"': 'style="cursor:default; text-decoration:none;"',
    'href="pillars/orphans.html"': 'style="cursor:default; text-decoration:none;"',
    'href="pillars/refugees.html"': 'style="cursor:default; text-decoration:none;"',
    'href="pillars/discipleship.html"': 'style="cursor:default; text-decoration:none;"',
    'href="pillars/evangelism.html"': 'style="cursor:default; text-decoration:none;"',
    'href="pillars/relief.html"': 'style="cursor:default; text-decoration:none;"',
    'href="pillars/schooling.html"': 'style="cursor:default; text-decoration:none;"',
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(file_path, "w", encoding="utf-8", newline="") as f:
    f.write(content)
print("Done")
