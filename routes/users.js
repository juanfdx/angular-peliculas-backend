const { Router } = require('express');
const { getUsers, createUser, getUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();


//ALL USERS: /api/users
router.get('/', validateJWT ,getUsers );

//CREATE  /api/users/create
router.post('/create', createUser );

//READ /api/users/id
router.get('/:id', getUser ); 

//UPDATE /api/users/id/edit
router.put('/:id/edit', validateJWT ,updateUser ); 

//DELETE /api/users/id
router.delete('/:id', validateJWT ,deleteUser);




module.exports = router;
