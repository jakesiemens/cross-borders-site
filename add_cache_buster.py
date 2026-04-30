import glob, re

files = glob.glob('draft/*.html') + glob.glob('draft/pillars/*.html')

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Add cache buster to script tags
    content = content.replace('js/data.js', 'js/data.js?v=1.1')
    content = content.replace('js/main.js', 'js/main.js?v=1.1')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print('Added cache busters to draft HTML files!')
