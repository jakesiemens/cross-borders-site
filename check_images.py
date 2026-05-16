import os
total_size = 0
count = 0
large_files = []
for root, _, files in os.walk('draft/images'):
    for f in files:
        if f.lower().endswith(('.png', '.jpg', '.jpeg')):
            path = os.path.join(root, f)
            size = os.path.getsize(path)
            total_size += size
            count += 1
            if size > 1000000:
                large_files.append((f, size/1000000))

print(f'Total images: {count}, Avg size: {total_size/count/1000 if count else 0:.2f} KB')
print('Large files (>1MB):')
for f, s in large_files:
    print(f'- {f}: {s:.2f} MB')
