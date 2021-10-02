const { Router } = require('express');
const { getComments } = require('../controllers/comment.controller');


const router = Router();


//ALL COMMENTS: /api/comments
router.get('/', getComments );





module.exports = router;