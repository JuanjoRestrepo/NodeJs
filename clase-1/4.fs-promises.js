// Esto solo en los modulos nativos
// que no tienen promesas nativas

// const { promisify } = require('node:util'); // promisify es una funcion que convierte callbacks en promesas
// const readFilePromise = promisify(fs.readFile);

const fs = require('node:fs');

console.log('Leyendo primer archivo...');
fs.readFile('./archivo.txt', 'utf-8').then((text) => {
  console.log('PRIMER TEXTO:', text);
});

console.log('----> Hacer cosas mientras lee el archivo...');

console.log('Leyendo segundo archivo...');
fs.readFile('./archivo2.txt', 'utf-8').then((text) => {
  console.log('SEGUNDO TEXTO:', text);
});
