// Asincrono con Callbacks

const fs = require('node:fs');

console.log('Leyendo primer archivo...');
const text = fs.readFileSync('./archivo.txt', 'utf-8');
console.log('PRIMER TEXTO:', text);

console.log('----> Hacer cosas mientras lee el archivo...');

console.log('Leyendo segundo archivo...');
const text2 = fs.readFileSync('./archivo2.txt', 'utf-8');
console.log('SEGUNDO TEXTO:', text2);
