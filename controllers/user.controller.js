const User = require('../models/User');



//OBTENER TODOS LOS USUARIOS
const getUsers = (req, res) => {

  User.findAll({

    attributes: ['id', 'name', 'lastName', 'email']

  }).then( users => {

    res.json({
      ok: true,
      users: users
    })

  }).catch( err => {

    res.json({
      ok: false,
      msg: err
      // msg: err.errors[0].message
    });

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

//OBTENER UN USUARIO
const getUser = (req, res) => {

  User.findByPk(
    req.params.id , 
    {attributes: ['id', 'name', 'lastName', 'email']}

  ).then( user => {

    if (user === null) {
      res.json({
        ok: false,
        msg: 'usuario no encontrado.'
      })

    } else {
      res.json({
        ok: true,
        user
      })

    }

  }).catch( err => {

    res.json({
      ok: false,
      msg: err
      // msg: err.errors[0].message
    });

  })
  
}

//EDITAR UN USUARIO
const updateUser = (req, res) => {

  User.update({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email

  }, {
    where: {
      id: req.params.id
    }

  }).then( result => {

    if (result[0] === 1) {
      res.json({
        ok: true,
        msg: 'usuario actualizado.'
      })

    } else {
      res.json({
        ok: false,
        msg: 'no se pudo actualizar el usuario.'
      })

    }

    // res.json(result);

  }).catch( err => {

    res.json({
      ok: false,
      msg: err
      // msg: err.errors[0].message
    });

  })

}

//BORRAR UN USUARIO
const deleteUser = (req, res) => {

  User.destroy({
    where: {
      id: req.params.id
    }

  }).then( result => {

    if (result === 1) {
      res.json({
        ok: true,
        msg: 'usuario borrado con exito.'
      })

    } else {
      res.json({
        ok: false,
        msg: 'no se pudo borrar el usuario.'
      })

    }

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
  createUser,
  getUser,
  updateUser,
  deleteUser
}