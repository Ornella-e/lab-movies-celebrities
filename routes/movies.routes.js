// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const async = require("hbs/lib/async");
const Movie = require('../models/Movie.model');

router.get('/create', (req, res, next) => {
    res.render('movies/new-movie');
  }) 

router.post('/create', async (req, res, next) => {
    try {
      const { title, genre, plot,cast } = req.body;
      await Movie.create({
        title, 
        genre, 
        plot,
        cast
      });
  
     res.redirect('/movies');
    } catch (error) {
      next(error);
      res.render('movies/new-movie');
    }
  })

  router.get('/:id/edit', async (req, res, next) => {
    try {
      const { id } = req.params;
      const movie = await Movie.findById(id);
      res.render('movies/edit-movie', movie);
    } catch (error) {
      next(error);
    }
  })
  
  router.post('/:id/edit', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, genre, plot, cast} = req.body;
      await Movie.findByIdAndUpdate(id,
        {
          title,
          genre,
          plot,
          cast
        },
        {
          new: true
        });
      
        res.redirect(`/movies/${id}`);
    } catch (error) {
      next(error);
    }
  })
  

  router.post('/:id/delete', async (req, res, next) => {
    try {
      const { id } = req.params;
      await Movie.findByIdAndDelete(id);
  
      res.redirect('/movies');
    } catch (error) {
      next(error);
    }
  })

  router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const movie = await Movie.findById(id);
      res.render('movies/movie-details', movie);
    } catch (error) {
      next(error);
    }
  })

router.get('/', async(req, res, next) => {
    try {
        const movies = await Movie.find();
        res.render('movies/movies', { movies });
    } catch (error) {
        next(error)
    }
  })

  

module.exports = router;