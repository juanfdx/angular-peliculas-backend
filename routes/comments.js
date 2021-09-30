const { Router } = require('express');
const { getComments, createComment } = require('../controllers/comment.controller');


const router = Router();


//ALL COMMENTS: /api/comments
router.get('/', getComments );

//CREATE  /api/comments/create
router.post('/create', createComment );

// //READ /api/movies/id
// router.get('/:id', getComment ); 

// //UPDATE /api/movies/id/edit
// router.put('/:id/edit', updateComment ); 

// //DELETE /api/movies/id
// router.delete('/:id', deleteComment);




module.exports = router;