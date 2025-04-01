import { readJSON } from '../utils.js';

const movies = readJSON('../movies.json');

// Logica de negocio
export class MovieModel {
  // info de cómo se filtran los datos y de donde se recuperan
  static getAll({ genre }) {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
    }
    return movies;
  }
}
