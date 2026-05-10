import os
import re

# 1. Restore FOOTER links in ALL 7 HTML files
files = [
    'index.html', 'about.html', 'borders.html', 'field-updates.html',
    'missionaries.html', 'contact.html', 'donate.html'
]
for file in files:
    filepath = os.path.join('draft', file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('<a style="cursor:default; text-decoration:none;"><span class="letter">B</span>ible Distribution</a>', '<a href="pillars/bible.html"><span class="letter">B</span>ible Distribution</a>')
    content = content.replace('<a style="cursor:default; text-decoration:none;"><span class="letter">O</span>rphans</a>', '<a href="pillars/orphans.html"><span class="letter">O</span>rphans</a>')
    content = content.replace('<a style="cursor:default; text-decoration:none;"><span class="letter">R</span>efugees</a>', '<a href="pillars/refugees.html"><span class="letter">R</span>efugees</a>')
    content = content.replace('<a style="cursor:default; text-decoration:none;"><span class="letter">D</span>iscipleship</a>', '<a href="pillars/discipleship.html"><span class="letter">D</span>iscipleship</a>')
    content = content.replace('<a style="cursor:default; text-decoration:none;"><span class="letter">E</span>vangelism</a>', '<a href="pillars/evangelism.html"><span class="letter">E</span>vangelism</a>')
    content = content.replace('<a style="cursor:default; text-decoration:none;"><span class="letter">R</span>elief <span style="font-size:0.7rem;opacity:0.6;">(Vision)</span></a>', '<a href="pillars/relief.html"><span class="letter">R</span>elief <span style="font-size:0.7rem;opacity:0.6;">(Vision)</span></a>')
    content = content.replace('<a style="cursor:default; text-decoration:none;"><span class="letter">S</span>chooling <span style="font-size:0.7rem;opacity:0.6;">(Vision)</span></a>', '<a href="pillars/schooling.html"><span class="letter">S</span>chooling <span style="font-size:0.7rem;opacity:0.6;">(Vision)</span></a>')
    
    with open(filepath, 'w', encoding='utf-8', newline='') as f:
        f.write(content)

# 2. Restore index.html pillar cards
index_path = os.path.join('draft', 'index.html')
with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()
    
content = content.replace('<div class="pillar-card">\n          <img src="images/Bible%20Distribution/IMG-20260214-WA0041.jpg"', '<div class="pillar-card" onclick="window.location.href=\'pillars/bible.html\'">\n          <img src="images/Bible%20Distribution/IMG-20260214-WA0041.jpg"')
content = content.replace('<div class="pillar-card">\n          <img src="images/Orphans/IMG_0011.jpeg"', '<div class="pillar-card" onclick="window.location.href=\'pillars/orphans.html\'">\n          <img src="images/Orphans/IMG_0011.jpeg"')
content = content.replace('<div class="pillar-card">\n          <img src="images/Refugees/IMG_2982.jpeg"', '<div class="pillar-card" onclick="window.location.href=\'pillars/refugees.html\'">\n          <img src="images/Refugees/IMG_2982.jpeg"')
content = content.replace('<div class="pillar-card">\n          <img src="images/Discipleship/IMG_9931.jpeg"', '<div class="pillar-card" onclick="window.location.href=\'pillars/discipleship.html\'">\n          <img src="images/Discipleship/IMG_9931.jpeg"')
content = content.replace('<div class="pillar-card">\n          <img src="images/Evangelism/IMG_2016.jpeg"', '<div class="pillar-card" onclick="window.location.href=\'pillars/evangelism.html\'">\n          <img src="images/Evangelism/IMG_2016.jpeg"')
content = content.replace('<div class="pillar-card">\n          <img src="images/Scenic/IMG_7404.jpg" alt="Emergency Relief"', '<div class="pillar-card" onclick="window.location.href=\'pillars/relief.html\'">\n          <img src="images/Scenic/IMG_7404.jpg" alt="Emergency Relief"')
content = content.replace('<div class="pillar-card">\n          <img src="images/IMG-20250610-WA0020.jpg"', '<div class="pillar-card" onclick="window.location.href=\'pillars/schooling.html\'">\n          <img src="images/IMG-20250610-WA0020.jpg"')

with open(index_path, 'w', encoding='utf-8', newline='') as f:
    f.write(content)

# 3. Restore borders.html rows
borders_path = os.path.join('draft', 'borders.html')
with open(borders_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to change <div class="pillar-row"> to <a href="..." class="pillar-row"> and append read more
def replace_row(content, pillar_id, title_text):
    # Find the block starting with <div class="pillar-row and ending with </div>\n      </div>
    pattern = r'<div class="pillar-row(.*?)">(.*?)<h2>' + title_text + r'(.*?)</div>\n      </div>'
    replacement = r'<a href="pillars/' + pillar_id + r'.html" class="pillar-row\1">\2<h2>' + title_text + r'\3<div class="read-more">View Pillar &rarr;</div>\n        </div>\n      </a>'
    return re.sub(pattern, replacement, content, flags=re.DOTALL)

content = replace_row(content, 'bible', 'Bible Distribution')
content = replace_row(content, 'orphans', 'Orphans')
content = replace_row(content, 'refugees', 'Refugees')
content = replace_row(content, 'discipleship', 'Discipleship')
content = replace_row(content, 'evangelism', 'Evangelism')
content = replace_row(content, 'relief', 'Relief')
content = replace_row(content, 'schooling', 'Schooling')

with open(borders_path, 'w', encoding='utf-8', newline='') as f:
    f.write(content)

print("Links restored.")
