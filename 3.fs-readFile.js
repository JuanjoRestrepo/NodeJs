const fs = require('node:fs');

console.log('Leyendo primer archivo...');
const text = fs.readFileSync('./archivo.txt', 'utf-8');

console.log(text);

console.log('Leyendo segundo archivo...');
const secondText = fs.readFileSync('./archivo2.txt', 'utf-8');

console.log(secondText);
