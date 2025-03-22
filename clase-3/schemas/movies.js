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
  rate: z.number().min(0).max(10),
  poster: z.string().url({
    message: 'Movie poster must be a valid URL',
  }),
  genre: z.array(
    z.enum([
      'action',
      'comedy',
      'drama',
      'fantasy',
      'horror',
      'romance',
      'sci-fi',
      'thriller',
    ]),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of enum Genre',
    }
  ),
});

function validateMovie(object) {
  return movieSchema.safeParse(object); // devuelve un objeto que dice si es valido o no
}

module.exports = {
  validateMovie,
};
