import glob, re

files = glob.glob('draft/*.html') + glob.glob('draft/pillars/*.html')

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    prefix = '../' if 'pillars' in f else ''
    
    # Fix the logo path in header/footer
    content = content.replace('src="./images/logo.png"', f'src="{prefix}images/logo.png"')
    
    # Fix the 404 links discovered by the browser agent
    content = content.replace('bible-distribution.html', 'bible.html')
    content = content.replace('orphan-care.html', 'orphans.html')
    
    # Ensure all links in the borders section on about page or home page use the correct pillars/ path
    content = re.sub(r'href=\"bible\.html\"', f'href=\"{prefix}pillars/bible.html\"', content)
    content = re.sub(r'href=\"orphans\.html\"', f'href=\"{prefix}pillars/orphans.html\"', content)
    content = re.sub(r'href=\"refugees\.html\"', f'href=\"{prefix}pillars/refugees.html\"', content)
    content = re.sub(r'href=\"discipleship\.html\"', f'href=\"{prefix}pillars/discipleship.html\"', content)
    content = re.sub(r'href=\"evangelism\.html\"', f'href=\"{prefix}pillars/evangelism.html\"', content)
    content = re.sub(r'href=\"relief\.html\"', f'href=\"{prefix}pillars/relief.html\"', content)
    content = re.sub(r'href=\"schooling\.html\"', f'href=\"{prefix}pillars/schooling.html\"', content)

    # Fix onclick handlers that were missed
    content = content.replace("onclick=\"window.location.href='pillars/", f"onclick=\"window.location.href='{prefix}pillars/")

    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print('Fixed draft HTML links and paths!')
