const path = require('path');
const fs = require('fs-extra');

const componentsPath = path.resolve(__dirname, 'dist/@applicature/ngx-web3-synergy');
const targetPath = path.resolve(__dirname, 'node_modules/@applicature/ngx-web3-synergy');

console.log('--------------- copy components package -----------------------');
fs.remove(targetPath, () => {
  fs.copySync(componentsPath, targetPath);
});
console.log('--------------- done -----------------------');

