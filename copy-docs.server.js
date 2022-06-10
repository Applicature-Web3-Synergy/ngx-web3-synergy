// scripts\build\copy-style.js
const path = require('path');
const fs = require('fs-extra');

const docJson = path.resolve(__dirname, 'doc/doc.json');
const componentsReadme = path.resolve(__dirname, 'projects/applicature/components/README.md');
const targetPath = path.resolve(__dirname, 'projects/ngx-components-doc/src/assets');


console.log('--------------- copy docJson file -----------------------');
fs.copySync(path.resolve(docJson), path.resolve(targetPath, 'jsons/doc.json'));
console.log('---------------done-----------------------');


console.log('--------------- copy component readme file -----------------------');
fs.copySync(path.resolve(componentsReadme), path.resolve(targetPath, 'md/component.md'));
console.log('---------------done-----------------------');
