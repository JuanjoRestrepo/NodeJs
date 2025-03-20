// Nuestra Primera API

const http = require('node:http');

const processRequest = (req, res) => {};

const server = http.createServer(processRequest);

server.listen(1234, () => {
  console.log('Server running on port http://localhost:1234');
});
