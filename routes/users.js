const { Router } = require('express');
const { getUsers, createUser } = require('../controllers/user.controller');


const router = Router();

//RUTA: /api/users
router.get('/', getUsers );
router.post('/', createUser );






module.exports = router;
