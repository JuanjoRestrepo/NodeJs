import { randomUUID } from 'crypto';
import { Router } from 'express';

import { validateMovie, validatePartialMovie } from '../schemas/movies.js';
import { readJSON } from './utils.js'; // importamos la funcion readJSON
import { MovieModel } from '../models/movie.js';

//========== COMO LEER UN JSON EN ESModules RECOMENDADO POR AHORA ==========
const movies = readJSON('./movies.json');
export const moviesRouter = Router();

moviesRouter.get('/', (req, res) => {
  const { genre } = req.query;
  const movies = MovieModel.getAll({ genre });
  res.json(movies);
});

moviesRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: 'Movie not found' });
});

moviesRouter.post('/', (req, res) => {
  const result = validateMovie(req.body);

  if (!result.success) {
    // 422 Unprocessable Entity
    // 400 Bad Request. Error propio del cliente. La solicitud contiene sintaxis incorrecta y no debería repetirse.
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  // en base de datos
  const newMovie = {
    id: randomUUID(), // uuid v4
    ...result.data, // ❌ req.body. != No es lo mismo
  };

  // Esto no sería REST, porque estamos guardando
  // el estado de la aplicación en memoria
  movies.push(newMovie);

  res.status(201).json(newMovie);
});

moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  movies.splice(movieIndex, 1);

  return res.json({ message: 'Movie deleted' });
});

moviesRouter.patch('/:id', (req, res) => {
  const result = validatePartialMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };

  movies[movieIndex] = updateMovie;

  return res.json(updateMovie);
});
