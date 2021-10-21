const { Router } = require('express');
const { login } = require('../controllers/auth.controller');


const router = Router();


//AUTH: /api/login
router.post('/', login )





module.exports = router;
