const path = require('path');
const fs = require('fs-extra');

const stylesPath = path.resolve(__dirname, 'dist/@applicature/styles');
const targetPath = path.resolve(__dirname, 'node_modules/@applicature/styles');

console.log('--------------- copy styles package -----------------------');
fs.remove(targetPath, () => {
  fs.copySync(stylesPath, targetPath);
});
console.log('--------------- done -----------------------');
