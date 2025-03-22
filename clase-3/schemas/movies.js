const z = require('zod'); // libreria para validar los datos que llegan

// Add this before your routes
const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required.',
  }),
  year: z.number().int().min(1900).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Movie poster must be a valid URL',
  }),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Crime',
      'Comedy',
      'Drama',
      'Fantasy',
      'Horror',
      'Romance',
      'Sci-Fi',
      'Thriller',
    ]),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of enum Genre',
    }
  ),
});

function validateMovie(input) {
  return movieSchema.safeParse(input); // devuelve un objeto que dice si es valido o no
}

function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input);
}

module.exports = {
  validateMovie,
  validatePartialMovie,
};
