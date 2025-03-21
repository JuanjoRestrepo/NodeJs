const http = require('node:http'); // Protocolo HTTP
const fs = require('node:fs');

const desiredPort = process.env.PORT ?? 1234;

// Servidor
const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (req.url === '/') {
    res.end('<h1>Mi página</h1>');
  } else if (req.url === '/imagen-super-bonita.jpg') {
    fs.readFile('./placa.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('<h1>500 Internal Server Error</h1>');
      } else {
        res.setHeader('Content-Type', 'image/jpg');
        res.end(data);
      }
    });
  } else if (req.url === '/contacto') {
    res.end('<h1>Contacto</h1>');
  } else {
    res.end('<h1>404</h1>');
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`Server running on port http://localhost:${desiredPort}`);
});
