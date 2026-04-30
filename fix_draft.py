import glob, re

files = glob.glob('draft/*.html') + glob.glob('draft/pillars/*.html')

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Fix the {prefix} literal
    prefix = '../' if 'pillars' in f else ''
    content = content.replace('{prefix}', prefix)
    
    # Convert a href="#" onclick="window.location.href='...'" to a href="..."
    content = re.sub(r'<a href="#" onclick="window\.location\.href=\\\'([^\']+)\\\'"', r'<a href="\1"', content)
    content = re.sub(r'<a href="#" onclick="window\.location\.href=\'([^\']+)\'"', r'<a href="\1"', content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print('Fixed draft HTML files!')
