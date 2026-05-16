import glob
import os

files = glob.glob('draft/*.html')
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace github io url with cbministries.ca
    content = content.replace('https://jakesiemens.github.io/cross-borders-site/', 'https://www.cbministries.ca/')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Updated og:image URLs in {len(files)} files.")
