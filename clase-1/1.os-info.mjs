import {
  platform,
  release,
  arch,
  cpus,
  freemem,
  totalmem,
  uptime,
} from 'node:os';

console.log('Informacion del OS:');
console.log('------------------');

console.log('Nombre OS:', platform());
console.log('Version:', release());
console.log('Arquitectura:', arch());
console.log('CPUs:', cpus());
console.log('Memoria libre:', freemem() / 1024 / 1024);
console.log('Total Memory:', totalmem() / 1024 / 1024);
console.log('Uptime :', uptime() / 60 / 60);
