const express = require('express'); // usamos require luego pasaremos a commonJS
const crypto = require('node:crypto'); // modulo de node para hashear
const movies = require('./movies.json');
const { error } = require('node:console');
const { validateMovie } = require('./schemas/movies');

const app = express();
app.use(express.json()); // middleware que parsea el body de la request a JSON
app.disable('x-powered-by'); // deshabilitamos la cabecera X-Powered-By: Express

// Todos los recursos que sean MOVIES se identifican con  /movies
app.get('/movies', (req, res) => {
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
  if (result.error) {
    // 422 Unprocessable Entity
    // 400 Bad Request. Error propio del cliente. La solicitud contiene sintaxis incorrecta y no debería repetirse.
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    ...result.data,
  };
  // Esto no seria REST, porque estamos guardando
  // el estado de la aplicacion en memoria
  movies.push(newMovie);

  res.status(201).json(newMovie);
});

const PORT = process.env.PORT ?? 1234; // si PORT no esta definido en el entorno, usamos 1234

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
