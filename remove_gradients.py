import os, glob, re

directory = r'c:\Users\inyma\OneDrive\Desktop\Ajith System Backup\inymart projects\Infinity Organics\infinity-backend\resources\js\Pages\Admin'
files = glob.glob(os.path.join(directory, '**', '*.jsx'), recursive=True)

# We will remove any bg-gradient-to-* that goes from a color to a DIFFERENT color,
# or simply replace the harsh green-to-orange ones created by the previous script.

replacements = [
    (r'bg-gradient-to-[a-z]{1,2}\s+from-green-([0-9]+)\s+to-orange-([0-9]+)', r'bg-green-\1'),
    (r'hover:from-green-([0-9]+)\s+hover:to-orange-([0-9]+)', r'hover:bg-green-\1'),
    (r'bg-gradient-to-[a-z]{1,2}\s+from-orange-([0-9]+)\s+to-amber-([0-9]+)', r'bg-orange-\1'),
    (r'bg-gradient-to-[a-z]{1,2}\s+from-teal-([0-9]+)\s+to-emerald-([0-9]+)', r'bg-emerald-\1'),
    (r'bg-gradient-to-[a-z]{1,2}\s+from-emerald-([0-9]+)\s+to-green-([0-9]+)', r'bg-green-\1'),
    (r'bg-gradient-to-[a-z]{1,2}\s+from-orange-([0-9]+)\s+to-orange-([0-9]+)', r'bg-orange-\1'),
    (r'from-green-([0-9]+)\s+to-orange-([0-9]+)', r'bg-green-\1'), # catch stragglers
]

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    new_content = content
    for pattern, repl in replacements:
        new_content, count = re.subn(pattern, repl, new_content)
        if count > 0:
            modified = True
            
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {filepath}')

print("Done stripping multi-color gradients.")
