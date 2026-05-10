import os
import re

filepath = os.path.join('draft', 'js', 'data.js')

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Roles
content = content.replace('"Core Team - Logistics & Outreach"', '"Core Team"')
content = content.replace('"Core Team - Discipleship & Training"', '"Core Team"')

# Replace content arrays for pillars
# We'll use a regex to find `content: [ ... ]` and replace it
replacement_text = """content: [
      "Detailed stories and updates regarding this pillar are coming soon. In the meantime, please view our photo gallery below or partner with us to support this work."
    ]"""

content = re.sub(r'content:\s*\[\s*".*?"\s*(?:,\s*".*?"\s*)*\]', replacement_text, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8', newline='') as f:
    f.write(content)

print("data.js updated.")
