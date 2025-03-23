const express = require('express'); // usamos require luego pasaremos a commonJS
const crypto = require('node:crypto'); // modulo de node para hashear
const cors = require('cors');
const movies = require('./movies.json');
const { validateMovie, validatePartialMovie } = require('./schemas/movies');

const app = express();
app.use(express.json()); // middleware que parsea el body de la request a JSON
app.use(cors());
app.disable('x-powered-by'); // deshabilitamos la cabecera X-Powered-By: Express

// metodos normales: GET/HEAD/POST
// meotodos complejos: PUT/DELETE/PATCH

// CORS: PRE-FLIGHT
// OPTIONS

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'https://movies.com',
  'https://midu.dev',
];
// Todos los recursos que sean MOVIES se identifican con  /movies
app.get('/movies', (req, res) => {
  const origin = req.get('origin');
  // cuando la peticion es del mismo ORIGIN
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter(
      (movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()) //comparamos el genero de la pelicula con el genero que nos pasan en minusculas
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
});

// Recuperamos una pelicula por su ID
app.get('/movies/:id', (req, res) => {
  // path-to-regexp: da una descripcion
  // librería de JavaScript que convierte patrones de rutas (como /user/:id) en expresiones regulares para
  // Coincidir y generar URLs
  // Extraer parámetros:
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body);

  if (!result.success) {
    // 422 Unprocessable Entity
    // 400 Bad Request. Error propio del cliente. La solicitud contiene sintaxis incorrecta y no debería repetirse.
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  // en base de datos
  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    ...result.data, // ❌ req.body. != No es lo mismo
  };
  // Esto no seria REST, porque estamos guardando
  // el estado de la aplicacion en memoria
  movies.push(newMovie);

  res.status(201).json(newMovie);
});

app.delete('/movies/:id', (req, res) => {
  const origin = req.header('origin');
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  movies.splice(movieIndex, 1);

  return res.json({ message: 'Movie deleted' });
});

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data,
  };

  movies[movieIndex] = updatedMovie;

  return res.json(updatedMovie);
});

app.options('/movies', (req, res) => {
  const origin = req.get('origin');
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT,PATCH, DELETE');
  }
  res.status(200);
});

const PORT = process.env.PORT ?? 1234; // si PORT no esta definido en el entorno, usamos 1234

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
