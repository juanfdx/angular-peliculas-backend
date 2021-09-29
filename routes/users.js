const { Router } = require('express');
const { getUsers, createUser, getUser, updateUser, deleteUser } = require('../controllers/user.controller');


const router = Router();


//ALL USERS: /api/users
router.get('/', getUsers );

//CREATE  /api/users/create
router.post('/create', createUser );

//READ /api/users/id
router.get('/:id', getUser ); 

//UPDATE /api/users/id/edit
router.put('/:id/edit', updateUser ); 

//DELETE /api/users/id
router.delete('/:id', deleteUser);




module.exports = router;
