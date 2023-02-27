const express = require('express');
const { Actor, Movie, Producer } = require('./movies.model');

const router = express.Router();

// Movies routes
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find().populate('producer').populate('actors');
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/movies/:id', getMovie, (req, res) => {
  res.json(res.movie);
});



router.post('/movies', async (req, res) => {
  const { name, year, plot, poster, producerName, actorNames } = req.body;
  // const producer = await Producer.findOne({ name: producerName });
  // let newProducer;
  // if (!producer) {
  //   newProducer = new Producer({ name: producerName });
  //   await newProducer.save();
  // }
  const movie = new Movie({
    name,
    year, 
    plot,
    poster,
    producerName,
    // : newProducer || producer,
    actors: [],
  });
  // for (const actorName of actorNames) {
  //   let actor = await Actor.findOne({ name: actorName });
  //   let newActor;
  //   if (!actor) {
  //     newActor = new Actor({ name: actorName });
  //     await newActor.save();
  //   }
  //   movie.actors.push(newActor || actor);
  // }
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/movies/:id', getMovie, async (req, res) => {
  const { name, year, plot, poster, producerName, actorNames } = req.body;
  if (name) {
    res.movie.name = name;
  }
  if (year) {
    res.movie.year = year;
  }
  if (plot) {
    res.movie.plot = plot;
  }
  if (poster) {
    res.movie.poster = poster;
  }
  if (producerName) {
    const producer = await Producer.findOne({ name: producerName });
    let newProducer;
    if (!producer) {
      newProducer = new Producer({ name: producerName });
      await newProducer.save();
    }
    res.movie.producer = newProducer || producer;
  }
  if (actorNames) {
    res.movie.actors = [];
    for (const actorName of actorNames) {
      let actor = await Actor.findOne({ name: actorName });
      let newActor;
      if (!actor) {
        newActor = new Actor({ name: actorName });
        await newActor.save();
      }
      res.movie.actors.push(newActor || actor);
    }
  }
  try {
    const updatedMovie = await res.movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete movie by id
router.delete('/movies/:id', async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      await movie.remove();
      res.json({ message: 'Movie deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

  async function getMovie(req, res, next) {
    try {
      const movie = await Movie.findById(req.params.id).populate('producer').populate('actors');
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.json(movie);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }


    
    module.exports = router;
    
    
    
    
    
  