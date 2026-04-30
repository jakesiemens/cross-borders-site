import os, re, shutil

# Create draft dir
os.makedirs("draft", exist_ok=True)
os.makedirs("draft/css", exist_ok=True)
os.makedirs("draft/js", exist_ok=True)
os.makedirs("draft/pillars", exist_ok=True)

# Copy images
if not os.path.exists("draft/images"):
    shutil.copytree("images", "draft/images")

with open("full-site-draft.html", "r", encoding="utf-8") as f:
    html = f.read()

def extract(tag_start, tag_end, content):
    s = content.find(tag_start)
    if s == -1: return ""
    e = content.find(tag_end, s)
    return content[s + len(tag_start):e]

css = extract('<style>', '</style>', html).strip()
with open("draft/css/style.css", "w", encoding="utf-8") as f:
    f.write(css)

# Data JS
s_start = html.find('const pillars =')
s_end = html.find('let slideIndices = {};')
data_js = html[s_start:s_end].strip()
with open('draft/js/data.js', 'w', encoding='utf-8') as f:
    f.write(data_js)

# Main JS
js = extract('<script>', '</script>', html).strip()
idx = js.find('let slideIndices = {};')
if idx != -1: js = js[idx:]

js = js.replace('function showDetail(slug) {', 'function renderPillarHTML(slug) {')
js = js.replace("document.getElementById('page-detail').innerHTML = html;", "document.getElementById('pillar-content-container').innerHTML = html;")
js = js.replace("document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));", "")
js = js.replace("document.getElementById('page-detail').classList.add('active');", "")

# Fix links in JS
js = js.replace('onclick="showPost(\\\'${p.id}\\\')"', 'onclick="window.location.href=\\\'field-updates.html?post=${p.id}\\\'"')
js = js.replace('onclick=\\"showPost(\\\'${p.id}\\\')\\"', 'onclick=\\"window.location.href=\\\'field-updates.html?post=${p.id}\\\'\\"')
js = js.replace('onclick="showPost(\'${p.id}\')"', 'onclick="window.location.href=\'../field-updates.html?post=${p.id}\'"')

js = js.replace('function showPost(id) {', 'function renderPostHTML(id) {')
js = js.replace("document.getElementById('page-post').innerHTML = html;", "document.getElementById('fu-grid').parentElement.innerHTML = html;")
js = js.replace("document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));", "")
js = js.replace("document.getElementById('page-post').classList.add('active');", "")
js = js.replace("renderFuGrid('All');", "")
js = re.sub(r"document.addEventListener\('DOMContentLoaded'.*?\}\);", "", js, flags=re.DOTALL)

# Fix JS paths
js = js.replace("window.location.href='borders.html'", "window.location.href=basePath + 'borders.html'")
js = js.replace("window.location.href='donate.html'", "window.location.href=basePath + 'donate.html'")
js = js.replace("window.location.href='field-updates.html'", "window.location.href=basePath + 'field-updates.html'")

js = js.replace("src=\"${d.image}\"", "src=\"${d.image.replace('./', basePath)}\"")
js = js.replace("src=\"${p.image}\"", "src=\"${p.image.replace('./', basePath)}\"")
js = js.replace("src=\"${img}\"", "src=\"${img.replace('./', basePath)}\"")
js = js.replace("openLightbox('${img}')", "openLightbox('${img.replace('./', basePath)}')")


init_logic = """
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const post_id = urlParams.get('post');
  if (post_id) {
    if (document.querySelector('.fu-hero')) {
       document.querySelector('.fu-hero').style.display = 'none';
    }
    renderPostHTML(post_id);
  } else if (document.getElementById('fu-grid')) {
    renderFuGrid('All');
  }
});
"""

# inject basePath helper for pillars
js = "const basePath = window.location.pathname.includes('/pillars/') || window.location.pathname.includes('\\\\pillars\\\\') ? '../' : './';\n" + js

with open('draft/js/main.js', 'w', encoding='utf-8') as f:
    f.write(js + "\n" + init_logic)

# HTML Gen
head_template = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Cross Borders Ministries - Draft Site</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="{prefix}css/style.css" />
</head>
<body>
"""

header_start = html.find('<header>')
header_end = html.find('<!-- ═══════════════════════════════════════════════════ PAGE: HOME -->')
header_block = html[header_start:header_end]
header_block = header_block.replace("showPage('home')", "window.location.href='{prefix}index.html'")
header_block = header_block.replace("showPage('borders')", "window.location.href='{prefix}borders.html'")
header_block = header_block.replace("showPage('about')", "window.location.href='{prefix}about.html'")
header_block = header_block.replace("showPage('contact')", "window.location.href='{prefix}contact.html'")
header_block = header_block.replace("showPage('donate')", "window.location.href='{prefix}donate.html'")
header_block = header_block.replace("showPage('field-updates')", "window.location.href='{prefix}field-updates.html'")
header_block = re.sub(r'<a href="#" onclick="window\.location\.href=\'([^\']+)\'"([^>]*)>', r'<a href="\1"\2>', header_block)
header_block = header_block.replace(";closeMobile()", "")

footer_start = html.find('<footer')
footer_end = html.find('</footer>') + len('</footer>')
footer_block = html[footer_start:footer_end]
footer_block = footer_block.replace("showPage('home')", "window.location.href='{prefix}index.html'")
footer_block = footer_block.replace("showPage('borders')", "window.location.href='{prefix}borders.html'")
footer_block = footer_block.replace("showPage('about')", "window.location.href='{prefix}about.html'")
footer_block = footer_block.replace("showPage('contact')", "window.location.href='{prefix}contact.html'")
footer_block = footer_block.replace("showPage('donate')", "window.location.href='{prefix}donate.html'")
footer_block = footer_block.replace("showPage('field-updates')", "window.location.href='{prefix}field-updates.html'")
footer_block = re.sub(r'<li onclick="showDetail\(\'([^\']+)\'\)">([^<]+)</li>', r'<li><a href="{prefix}pillars/\1.html">\2</a></li>', footer_block)
footer_block = re.sub(r'<a href="#" onclick="window\.location\.href=\'([^\']+)\'"([^>]*)>', r'<a href="\1"\2>', footer_block)


lightbox_html = """
<div id="lightbox-modal" class="lightbox" onclick="closeLightbox(event)">
  <span class="lightbox-close" onclick="closeLightbox(event)">&times;</span>
  <img class="lightbox-content" id="lightbox-img" />
</div>
<script src="{prefix}js/data.js"></script>
<script src="{prefix}js/main.js"></script>
</body>
</html>
"""

def extract_page(page_id):
    start = html.find(f'id="{page_id}"')
    if start == -1: return ""
    start = html.find('>', start) + 1
    end = html.find('<!-- ════════', start)
    if end == -1:
        end = html.find('</main>', start)
        if end == -1: end = html.find('<footer', start)
    content = html[start:end].strip()
    if content.endswith('</div>'): content = content[:-6].strip()
    return content

def build_page(filename, page_id, prefix=""):
    content = extract_page(page_id)
    content = content.replace('src="./images/', f'src="{prefix}images/')
    content = re.sub(r'onclick="showDetail\(\'([^\']+)\'\)"', r'onclick="window.location.href=\'{prefix}pillars/\1.html\'"', content)
    content = re.sub(r'onclick="showPage\(\'([^\']+)\'\)"', r'onclick="window.location.href=\'{prefix}\1.html\'"', content)
    content = re.sub(r'showPost\(\'([^\']+)\'\)', f"window.location.href='{prefix}field-updates.html?post=\\1'", content)
    
    # Fix the buttons
    content = re.sub(r'<a href="#" onclick="window\.location\.href=\'([^\']+)\'"', r'<a href="\1"', content)

    full_html = head_template.format(prefix=prefix) + header_block.format(prefix=prefix) + f'<main>\n{content}\n</main>' + footer_block.format(prefix=prefix) + lightbox_html.format(prefix=prefix)
    with open(f"draft/{filename}", "w", encoding="utf-8") as f: f.write(full_html)

build_page("index.html", "page-home")
build_page("about.html", "page-about")
build_page("contact.html", "page-contact")
build_page("donate.html", "page-donate")
build_page("field-updates.html", "page-field-updates")
build_page("borders.html", "page-borders")

pillar_keys = ["bible", "orphans", "refugees", "discipleship", "evangelism", "relief", "schooling"]
for key in pillar_keys:
    pillar_html = head_template.format(prefix="../") + header_block.format(prefix="../") + f'<main><div id="pillar-content-container"></div></main>' + footer_block.format(prefix="../") + lightbox_html.format(prefix="../")
    pillar_html = pillar_html.replace('</body>', f'<script>document.addEventListener("DOMContentLoaded", () => renderPillarHTML("{key}"));</script></body>')
    with open(f"draft/pillars/{key}.html", "w", encoding="utf-8") as f: f.write(pillar_html)

print("Draft site built successfully!")
