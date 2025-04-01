import { randomUUID } from 'node:crypto';
import { readJSON } from '../utils.js';
const movies = readJSON('../movies.json');

// Logica de negocio
export class MovieModel {
  // info de cómo se filtran los datos y de donde se recuperan
  static getAll = async ({ genre }) => {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
    }
    return movies;
  };

  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie;
  }

  static async create({ input }) {
    const newMovie = {
      id: randomUUID(), // uuid v4
      ...input, // ❌ req.body. != No es lo mismo
    };

    // Esto no sería REST, porque estamos guardando
    // el estado de la aplicación en memoria
    movies.push(newMovie);

    return newMovie;
  }

  static async delete({ id }) {
    // id es objeto y es mas facil de leer.
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return false;

    movies.splice(movieIndex, 1);
    return true;
  }

  static async update({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) {
      throw new Error('Movie not found');
    }

    const updatedMovie = {
      ...movies[movieIndex],
      ...input,
    };

    movies[movieIndex] = updatedMovie;

    return updatedMovie;
  }
}
