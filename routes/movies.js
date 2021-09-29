const { Router } = require('express');
const { getMovies, createMovie, getMovie, updateMovie, deleteMovie } = require('../controllers/movie.controller');


const router = Router();


//ALL MOVIES: /api/movies
router.get('/', getMovies );

//CREATE  /api/movies/create
router.post('/create', createMovie );

//READ /api/movies/id
router.get('/:id', getMovie ); 

//UPDATE /api/movies/id/edit
router.put('/:id/edit', updateMovie ); 

//DELETE /api/movies/id
router.delete('/:id', deleteMovie);




module.exports = router;