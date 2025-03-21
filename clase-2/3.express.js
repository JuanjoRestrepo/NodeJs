const express = require('express');
const ditto = require('./pokemon/ditto.json');

const PORT = process.env.PORT ?? 1234;

const app = express();
app.disable('x-powered-by');

app.use(express.json());

/*
app.use((req, res, next) => {
  if (req.method !== 'POST') {
    return next();
  }
  if (req.headers['content-type'] !== 'application/json') {
    return next();
  }

  // solo llegan request que son POST y que tienen el header content-type: application/json
  let body = '';

  // escuchar el evento data
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();
    // mutar el request para que tenga la info que necesito
    res.body = data;
    next();
  });
});

*/

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto);
});

app.post('/pokemon', (req, res) => {
  // req.body deberiamos guardar en la base de datos
  res.status(201).json(req.body);
});

// la ultima a la que va a llegar
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>');
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
