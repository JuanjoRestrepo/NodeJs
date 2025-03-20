const http = require('node:http');
const { findAvailablePort } = require('./10.free-port');

const desiredPort = process.env.PORT ?? 3000;

// Servidor
const server = http.createServer((req, res) => {
  console.log('request received');
  res.end('Hola papi');
});

findAvailablePort(desiredPort).then((port) => {
  server.listen(port, () => {
    console.log(
      `Server running on port http://localhost:${server.address().port}`
    );
  });
});
