import { createApp } from './app.js';
import { MovieModel } from './models/local-file-system/movie.js';

console.log('Starting server with Local File System...');
createApp({ movieModel: MovieModel });
