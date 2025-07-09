import { createApp } from './app.js';
import { MovieModel } from './models/mysql/movie.js';

console.log('Starting server with MySQL...');
createApp({ movieModel: MovieModel });
