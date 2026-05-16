import os
import re

files = [
    'index.html', 'about.html', 'borders.html', 'field-updates.html',
    'missionaries.html', 'contact.html', 'donate.html'
]

ga_script = """<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-04BW1GEP50"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-04BW1GEP50');
</script>
"""

for file in files:
    filepath = os.path.join('draft', file)
    if not os.path.exists(filepath): continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if GA is already injected to avoid duplicates
    if "G-04BW1GEP50" not in content:
        # Inject right before </head>
        content = content.replace('</head>', f'{ga_script}</head>')
        
        with open(filepath, 'w', encoding='utf-8', newline='') as f:
            f.write(content)

print("Google Analytics injected successfully.")
