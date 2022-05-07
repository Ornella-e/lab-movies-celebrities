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

router.get('/', async(req, res, next) => {
    try {
        const movies = await Movie.find();
        res.render('movies/movies', { movies });
    } catch (error) {
        next(error)
    }
  })

module.exports = router;