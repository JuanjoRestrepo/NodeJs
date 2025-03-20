// Asincrono Secuencial

// Esto solo en los modulos nativos
// que no tienen promesas nativas

// const { promisify } = require('node:util'); // promisify es una funcion que convierte callbacks en promesas
// const readFilePromise = promisify(fs.readFile);

const { readFile } = require('node:fs/promises');

async function init() {
  console.log('Leyendo primer archivo...');
  const text = await readFile('./archivo.txt', 'utf-8');
  console.log('PRIMER TEXTO:', text);
  console.log('----> Hacer cosas mientras lee el archivo...');

  console.log('Leyendo segundo archivo...');
  const text2 = await readFile('./archivo2.txt', 'utf-8');
  console.log('SEGUNDO TEXTO:', text2);
}

init();

// (async () => {
//   console.log('Leyendo primer archivo...');
//   const text = await readFile('./archivo.txt', 'utf-8');
//   console.log('PRIMER TEXTO:', text);
//   console.log('----> Hacer cosas mientras lee el archivo...');

//   console.log('Leyendo segundo archivo...');
//   const text2 = await readFile('./archivo2.txt', 'utf-8');
//   console.log('SEGUNDO TEXTO:', text2);
// })();
