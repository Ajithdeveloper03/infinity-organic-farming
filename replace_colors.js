const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      if (file !== 'node_modules' && file !== '.expo' && file !== '.git') {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.js')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
};

const files = walkSync('.');
let updatedCount = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/#15803d/gi, '#15803d');
  newContent = newContent.replace(/#15803d/gi, '#15803d');
  newContent = newContent.replace(/#ea580c/gi, '#ea580c');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log(`Updated ${file}`);
    updatedCount++;
  }
});

console.log(`Finished updating colors in ${updatedCount} files.`);
