const mongoose = require('mongoose');

const ActorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  bio: { type: String, required: true },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

const MovieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  plot: { type: String, required: true },
  poster: { type: String, required: true },
  producer: { type: mongoose.Schema.Types.ObjectId, ref: 'Producer' },
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }]
});

const ProducerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  bio: { type: String, required: true },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

const Actor = mongoose.model('Actor', ActorSchema);
const Movie = mongoose.model('Movie', MovieSchema);
const Producer = mongoose.model('Producer', ProducerSchema);

module.exports = { Actor, Movie, Producer };
