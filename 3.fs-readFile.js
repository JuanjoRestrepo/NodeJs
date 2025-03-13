// Asincrono con Callbacks

const fs = require('node:fs');

console.log('Leyendo primer archivo...');
//const text = fs.readFileSync('./archivo.txt', 'utf-8'); // Forma Sincrona de leer archivos

//Forma Asincrona de leer archivos
// No es necesario guardalo en una variable
fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
  // Ejectuas este callback cuando termines de leer el archivo
  console.log('PRIMER TEXTO:', text);
});

console.log('----> Hacer cosas mientras lee el archivo...');

console.log('Leyendo segundo archivo...');
// No es necesario guardalo en una variable
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
  console.log('SEGUNDO TEXTO:', text);
});
