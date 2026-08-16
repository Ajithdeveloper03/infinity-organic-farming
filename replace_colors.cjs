const fs = require('fs');
const path = require('path');

const directory = 'c:\\Users\\inyma\\OneDrive\\Desktop\\Ajith System Backup\\inymart projects\\Infinity Organics\\infinity-backend\\resources\\js\\Pages\\Admin';

const replacements = {
    'indigo-': 'green-',
    'violet-': 'orange-',
    'purple-': 'amber-',
    'pink-': 'orange-',
    '/images/logo.jpg': 'https://ui-avatars.com/api/?name=User&background=10b981&color=fff',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d': 'https://ui-avatars.com/api/?name=User&background=f97316&color=fff'
};

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.jsx')) results.push(file);
        }
    });
    return results;
}

const files = walk(directory);

files.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf8');
    let modified = false;
    
    for (const [old, newVal] of Object.entries(replacements)) {
        if (content.includes(old)) {
            content = content.split(old).join(newVal);
            modified = true;
        }
    }
    
    if (modified) {
        fs.writeFileSync(filepath, content, 'utf8');
        console.log('Updated ' + filepath);
    }
});
console.log('All colors and images updated.');
