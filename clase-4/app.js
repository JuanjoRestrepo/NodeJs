import express, { json } from 'express'; // usamos require luego pasaremos a commonJS
import { moviesRouter } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';

// EN EL FUTURO: el import del json sería así:
//import movies from './movies.json' assert { type: 'json' };

//========== COMO LEER UN JSON EN ESModules ==========
//import fs from 'node:fs';
//const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));

const app = express();
app.use(json()); // middleware que parsea el body de la request a JSON
app.use(corsMiddleware());
app.disable('x-powered-by'); // deshabilitar el header X-Powered-By: Express

// Todos los recursos que sean MOVIES se identifica con /movies
app.use('/movies', moviesRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});

// métodos normales: GET/HEAD/POST
// métodos complejos: PUT/PATCH/DELETE

// CORS PRE-Flight
// OPTIONS
