from PIL import Image
import os

def optimize_image(input_path, output_path, max_width=1200, quality=85):
    img = Image.open(input_path)
    
    # Calculate new height to maintain aspect ratio
    if img.width > max_width:
        w_percent = (max_width / float(img.width))
        h_size = int((float(img.height) * float(w_percent)))
        img = img.resize((max_width, h_size), Image.Resampling.LANCZOS)
    
    # Save as JPEG with optimization
    img.save(output_path, "JPEG", optimize=True, quality=quality)
    print(f"Optimized image saved to {output_path}")
    print(f"Original size: {os.path.getsize(input_path)} bytes")
    print(f"New size: {os.path.getsize(output_path)} bytes")

if __name__ == "__main__":
    input_file = r"D:\Personal\Cross Borders Ministries Website\CBM\images\Missionaries\John and Susie.jpg"
    output_file = r"D:\Personal\Cross Borders Ministries Website\CBM\draft\images\Missionaries\john-susie.jpg"
    optimize_image(input_file, output_file)
