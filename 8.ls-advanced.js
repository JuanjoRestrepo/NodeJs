const fs = require('node:fs/promises');
const path = require('node:path');

const folder = process.argv[2] ?? '.';

async function ls(folder) {
  let files;
  try {
    files = await fs.readdir(folder);
  } catch (error) {
    console.error('No se pudo leer el directorio: ${folder}');
    process.exit(1);
  }

  // Mapeamos cada archivo
  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file);
    let stats;
    try {
      stats = await fs.stat(filePath); // status - informacion del archivo
    } catch (error) {
      console.error('No se pudo leer el archivo: ${filePath}');
      process.exit(1);
    }

    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? 'd' : 'f';
    const fileSize = stats.size.toString();
    const fileModifiedDate = stats.mtime.toLocaleString();

    return `${fileType} ${file.padEnd(20)} ${fileSize.padStart(
      10
    )} ${fileModifiedDate}`;
  });

  const filesInfo = await Promise.all(filesPromises);

  console.log('\n==== Archivos ====');
  filesInfo.forEach((fileInfo) => {
    console.log(fileInfo);
  });
}

ls(folder);
