import mysql from 'mysql2/promise';

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb',
};
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

const connection = await mysql.createConnection(connectionString);

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase();

      // get genre ids from database table using genre names
      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      );

      // No genres found
      if (genres.length === 0) {
        return [];
      }

      // get the id from the first genre result
      const [{ id }] = genres;

      // get all movies ids from database table
      // la query a movie_genres
      // join
      // y devolver resultados..
      // Get movies for this genre using a JOIN
      const [movies] = await connection.query(
        `SELECT m.title, m.year, m.director, m.duration, m.poster, m.rate, BIN_TO_UUID(m.id) id
        FROM movie m
        JOIN movie_genres mg ON m.id = mg.movie_id
        WHERE mg.genre_id = ?;`,
        [id]
      );
      return movies;
    }

    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
    );

    console.log('Movies retrieved:', movies.length);
    return movies;
  }

  static async getById({ id }) {
    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    );

    if (movies.length === 0) {
      return null;
    }

    console.log('Got movie by ID:', id);
    return movies[0];
  }

  static async create({ input }) {
    const {
      genre: genreInput, // genre is an array
      title,
      year,
      duration,
      director,
      rate,
      poster,
    } = input;

    // todo: crear la conexión de genre

    // crypto.randomUUID()
    const [uuidResult] = await connection.query('SELECT UUID() uuid;');
    const [{ uuid }] = uuidResult;

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate)
          VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate]
      );
    } catch (error) {
      // console.log puede enviarle información sensible
      throw new Error('Error creating movie');
      // enviar la traza a un servicio interno
      // sendLog(error)
    }

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movie WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    );

    console.log('Movie created:', movies[0]);
    return movies[0];
  }

  static async delete({ id }) {
    const [result] = await connection.query(
      'DELETE FROM movie WHERE id = UUID_TO_BIN(?);',
      [id]
    );
    console.log('Movie deleted:', id);
    return result.affectedRows > 0;
  }

  static async update({ id, input }) {
    console.log('Using update');
    // Build dynamic SET clause and values
    const allowedFields = [
      'title',
      'year',
      'director',
      'duration',
      'poster',
      'rate',
    ];
    const setClauses = [];
    const values = [];

    for (const field of allowedFields) {
      if (input[field] !== undefined) {
        setClauses.push(`${field} = ?`);
        values.push(input[field]);
      }
    }

    if (setClauses.length === 0) {
      // Nothing to update
      return null;
    }

    values.push(id); // for WHERE clause

    const [result] = await connection.query(
      `UPDATE movie SET ${setClauses.join(', ')} WHERE id = UUID_TO_BIN(?);`,
      values
    );

    if (result.affectedRows === 0) {
      return null;
    }

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    );

    console.log('Movie updated:', id);
    return movies[0];
  }
}
