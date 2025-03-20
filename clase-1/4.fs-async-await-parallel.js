// Esto solo en los modulos nativos
// que no tienen promesas nativas

// const { promisify } = require('node:util'); // promisify es una funcion que convierte callbacks en promesas
// const readFilePromise = promisify(fs.readFile);

import { readFile } from 'node:fs/promises';

// Paralelizamos la sincronia
Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8'),
]).then(([text, text2]) => {
  console.log('PRIMER TEXTO:', text);
  console.log('SEGUNDO TEXTO:', text2);
});
