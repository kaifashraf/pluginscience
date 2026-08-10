const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      // Only process .ts, .tsx, .js, .jsx files
      if (/\.(tsx|ts|jsx|js|md)$/.test(file)) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

const rootDirs = [
  path.join(__dirname, '..', 'app'),
  path.join(__dirname, '..', 'components')
];

let filesToProcess = [];
rootDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    filesToProcess = filesToProcess.concat(getAllFiles(dir));
  }
});

let modifiedCount = 0;

filesToProcess.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace "Plugin" with "Plug-in" when used as a standalone word
  const regex = /(?<![-a-zA-Z0-9])Plugin(?![a-zA-Z0-9])/g;
  
  if (regex.test(content)) {
    const newContent = content.replace(regex, 'Plug-in');
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      modifiedCount++;
      console.log(`Updated: ${filePath}`);
    }
  }
});

console.log(`\nSuccessfully updated ${modifiedCount} files.`);
