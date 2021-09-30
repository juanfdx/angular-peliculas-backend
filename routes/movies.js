const { Router } = require('express');
const { 
  getTheMovies, 
  createTheMovie, 
  getTheMovie, 
  updateTheMovie, 
  deleteTheMovie, 
  getMovieAndComments, 
  rateAndCommentMovie 

} = require('../controllers/movie.controller');


const router = Router();


//ALL MOVIES: /api/movies
router.get('/', getTheMovies );

//CREATE  /api/movies/create
router.post('/create', createTheMovie );

//READ /api/movies/id
router.get('/:id', getTheMovie ); 

//UPDATE /api/movies/id/edit
router.put('/:id/edit', updateTheMovie ); 

//DELETE /api/movies/id
router.delete('/:id', deleteTheMovie);

//ASSOCIATIONS
//READ /api/movies/id/comments
router.get('/:id/comments', getMovieAndComments ); 

//CREATE /api/movies/id/comments/create
router.post('/:id/comments/create', rateAndCommentMovie ); 



module.exports = router;