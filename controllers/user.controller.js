const User = require('../models/User');



//OBTENER TODOS LOS USUARIOS
const getUsers = (req, res) => {

  res.json({
    ok: true,
    msg: 'Show all users'
  })

}

//CREAR UN USUARIO
const createUser = (req, res) => {

  User.create({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password

  }).then( user => {

    res.json({
      ok: true,
      user: user
    })

  }).catch( err => {
    res.json({
      ok: false,
      msg: err
      // msg: err.errors[0].message
    });


  })


}




module.exports = {
  getUsers,
  createUser
}