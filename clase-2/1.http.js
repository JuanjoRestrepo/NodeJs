const http = require('node:http'); // Protocolo HTTP

const desiredPort = process.env.PORT ?? 1234;

// Servidor
const processRequest = (req, res) => {
  if (req.url === '/') {
    res.statusCode = 200; // OK
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<h1>Bienvenido a mi página de inicio</h1>');
  } else if (req.url === '/contacto') {
    res.statusCode = 200; // OK
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<h1>Contacto</h1>');
  } else {
    res.statusCode = 404; // Not Found
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<h1>404 Not Found</h1>');
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`Server running on port http://localhost:${desiredPort}`);
});
