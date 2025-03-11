const os = require('node:os');

console.log('Informacion del OS:');
console.log('------------------');

console.log('Nombre OS:', os.platform());
console.log('Version:', os.release());
console.log('Arquitectura:', os.arch());
console.log('CPUs:', os.cpus());
console.log('Memoria libre:', os.freemem() / 1024 / 1024);
console.log('Total Memory:', os.totalmem() / 1024 / 1024);
console.log('Uptime :', os.uptime() / 60 / 60);
