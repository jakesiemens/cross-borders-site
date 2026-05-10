import os
import re

files = {
    'index.html': 'Cross Borders Ministries | Reaching the Unreached',
    'about.html': 'About Us | Cross Borders Ministries',
    'borders.html': 'Our Mission | Cross Borders Ministries',
    'field-updates.html': 'Field Updates | Cross Borders Ministries',
    'missionaries.html': 'Our Missionaries | Cross Borders Ministries',
    'contact.html': 'Contact Us | Cross Borders Ministries',
    'donate.html': 'Donate | Cross Borders Ministries'
}

meta_tags = """<meta name="description" content="Cross Borders Ministries exists to supply the Word of God to those who need it most, bring hope to the Fatherless, and disciple the nations across Southeast Asia." />
<meta property="og:title" content="Cross Borders Ministries" />
<meta property="og:description" content="Obeying the Call of Christ Across Every Border. Reaching Asia with God's Word and bringing hope to those who need it most." />
<meta property="og:image" content="https://jakesiemens.github.io/cross-borders-site/images/Scenic/IMG_7404.jpg" />
<link rel="icon" type="image/png" href="images/logo.png" />"""

for filename, title in files.items():
    filepath = os.path.join('draft', filename)
    if not os.path.exists(filepath): continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the existing <title> block
    content = re.sub(r'<title>.*?</title>', f'<title>{title}</title>\n{meta_tags}', content)
    
    with open(filepath, 'w', encoding='utf-8', newline='') as f:
        f.write(content)

print("SEO tags injected successfully.")
