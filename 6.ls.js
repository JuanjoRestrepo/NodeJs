const fs = require('node:fs/promises');

// ===== USANDO CATCH =====
fs.readdir('.')
  .then((files) => {
    console.log('\n==== Archivos ====');
    files.forEach((file) => {
      console.log(file);
    });
  })
  .catch((err) => {
    if (err) {
      console.error('Error al leer el directorio: ', err);
      return;
    }
  });
