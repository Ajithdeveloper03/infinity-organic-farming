import os, glob, re, json

directory = r'c:\Users\inyma\OneDrive\Desktop\Ajith System Backup\inymart projects\Infinity Organics\infinity-backend\resources\js\Pages\Admin'
files = glob.glob(os.path.join(directory, '**', '*.jsx'), recursive=True)

keys = set()
pattern = re.compile(r"t\(\s*['\"](.*?)['\"]\s*\)")

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    matches = pattern.findall(content)
    for m in matches:
        keys.add(m)

print(json.dumps(list(keys), indent=2))
