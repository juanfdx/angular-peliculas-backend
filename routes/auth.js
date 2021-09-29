const { Router } = require('express');
const { authUser } = require('../controllers/auth.controller');


const router = Router();


//AUTH: /api/login
router.post('/', authUser )







module.exports = router;
