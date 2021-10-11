const { Router } = require('express');
const { getSearch } = require('../controllers/search.controller')

const router = Router();


//READ /api/search/param
router.get('/:param', getSearch ); 




module.exports = router;
