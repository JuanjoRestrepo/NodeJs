const express = require('express'); // usamos require luego pasaremos a commonJS
const movies = require('./movies.json');

const app = express();
app.disable('x-powered-by'); // deshabilitamos la cabecera X-Powered-By: Express

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Todos los recursos que sean MOVIES se identifican con  /movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

const PORT = process.env.PORT ?? 1234; // si PORT no esta definido en el entorno, usamos 1234

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
