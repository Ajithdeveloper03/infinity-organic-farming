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
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
};

const files = walkSync('./app');
let updatedCount = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Exclude fixing things that already have gotham or brandon, just replace the generic ones
  // We use regex negative lookbehind if possible, or just replace and then clean up duplicates
  let newContent = content.replace(/font-extrabold/g, 'font-gotham-bold');
  
  // Replace font-bold with font-gotham-bold, but don't touch font-gotham-bold
  newContent = newContent.replace(/(?<!gotham-)font-bold/g, 'font-gotham-bold');
  
  // Replace font-medium with font-brandon-medium, but don't touch font-brandon-medium
  newContent = newContent.replace(/(?<!brandon-)font-medium/g, 'font-brandon-medium');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log(`Updated fonts in ${file}`);
    updatedCount++;
  }
});

console.log(`Finished updating fonts in ${updatedCount} files.`);
