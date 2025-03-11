const fs = require('node:fs'); // a partir de node 16, poner node:fs

const stats = fs.statSync('./archivo.txt');
console.log('------------------');
console.log(
  stats.isFile(),
  stats.isDirectory(),
  stats.isSymbolicLink(),
  stats.size
);
