const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { 
  getAllMovies, 
  createTheMovie, 
  getTheMovie, 
  updateTheMovie, 
  deleteTheMovie, 
  getMovieAndComments, 
  commentTheMovie,
  rateTheMovie 

} = require('../controllers/movie.controller');


const router = Router();


//ALL MOVIES: /api/movies
router.get('/', getAllMovies );

//CREATE  /api/movies/create
router.post('/create', createTheMovie );

//READ /api/movies/id
router.get('/:id', getTheMovie ); 

//UPDATE /api/movies/id/edit
router.put('/:id/edit', validateJWT, updateTheMovie ); 

//DELETE /api/movies/id
router.delete('/:id', validateJWT, deleteTheMovie);

//ASSOCIATIONS
//READ /api/movies/id/comments
router.get('/:id/comments', getMovieAndComments ); 

//CREATE MOVIE COMMENT /api/movies/id/comment
router.post('/:id/comment', validateJWT, commentTheMovie ); 

//RATE A MOVIE /api/movies/id/rate
router.post('/:id/rate', validateJWT, rateTheMovie ); 



module.exports = router;