import os, glob, re

directory = r'c:\Users\inyma\OneDrive\Desktop\Ajith System Backup\inymart projects\Infinity Organics\infinity-backend\resources\js\Pages\Admin'
files = glob.glob(os.path.join(directory, '**', '*.jsx'), recursive=True)

# We map solid flat colors (which we just added) to elegant, aesthetic, harmonious gradients.
replacements = [
    # Primary button/CTA gradients (Green)
    (r'\bbg-green-600\b', r'bg-gradient-to-r from-emerald-600 to-teal-600'),
    (r'\bhover:bg-green-700\b', r'hover:from-emerald-700 hover:to-teal-700'),
    
    # Secondary button/CTA gradients (Orange)
    (r'\bbg-orange-500\b', r'bg-gradient-to-r from-orange-500 to-amber-500'),
    (r'\bhover:bg-orange-600\b', r'hover:from-orange-600 hover:to-amber-600'),
    (r'\bhover:bg-orange-700\b', r'hover:from-orange-600 hover:to-amber-600'),

    # Emerald (if any)
    (r'\bbg-emerald-500\b', r'bg-gradient-to-r from-teal-500 to-emerald-500'),
    
    # Dashboard Cards (re-introducing light aesthetic gradients instead of bg-white for cards)
    # This is tricky with regex, we will leave the dashboard specific ones to be done manually 
    # via multi_replace_file_content for precision.
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

print("Done applying aesthetic gradients.")
