const path = require('path');
const fs = require('fs-extra');

const componentsPath = path.resolve(__dirname, 'dist/@applicature/components');
const targetPath = path.resolve(__dirname, 'node_modules/@applicature/components');

console.log('--------------- copy components package -----------------------');
fs.remove(targetPath, () => {
  fs.copySync(componentsPath, targetPath);
});
console.log('--------------- done -----------------------');

