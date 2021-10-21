const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


//OBTENER TODOS LOS USUARIOS
const getUsers = (req, res) => {

  User.findAndCountAll({

    attributes: ['id', 'firstName', 'lastName', 'email']

  }).then( users => {

    res.json(users)

  }).catch( err => {

    res.json({
      ok: false,
      msg: 'Error inesperado...'
    });

  })

}

//CREAR UN USUARIO
const createUser = (req, res) => {
  
  const { firstName, lastName, email, password } = req.body;

  //Verificamos si el email ya existe
  User.findOne({
    where: {
      email: email
    }

  }).then( result => {

    if (result) {

      return res.status(400).json({
        ok: false,
        msg: 'El email ya esta registrado.'
      });

    } else {

      //No se admite cadena vacia  
      if ((/^$|\s+/.test(password))) {

        return res.json({
          ok: false,
          msg: 'Debe escribir un password'
        });

      }

      //encriptamos el password
      const salt = bcrypt.genSaltSync();
      passEncrypted = bcrypt.hashSync(password, salt);

      //Creamos el usuario
      User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passEncrypted,
        image: 'no-image.jpg'

      }).then( user => {

        //Para no mostrar el password , creamos un user sin password
        user = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image
        }

        //Generamos el JWT:
        generateJWT(user.id).then( token => {
          
          res.json({
            ok: true,
            user,
            token 
          })

        });

      }).catch( err => {

        res.json({
          ok: false,
          msg: 'Error de validacion.'
        });

      })

    }

  }).catch( err => {

    res.json({
      ok: false,
      msg: 'Error inesperado.'
    });

  })

}


//OBTENER UN USUARIO
const getUser = (req, res) => {

  User.findByPk(
    req.params.id, 
    {attributes: ['id', 'firstName', 'lastName', 'email', 'image', 'password']}

  ).then( user => {

    if (user === null) {
      res.json({
        ok: false,
        msg: 'usuario no encontrado.'
      })

    } else {
      res.json(user)

    }

  }).catch( err => {

    res.json({
      ok: false,
      msg: 'Error inesperado.'
    });

  })
  
}


//EDITAR UN USUARIO
const updateUser = (req, res) => {

  User.update({
    firstName: req.body.firstName,
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

  }).catch( err => {

    res.json({
      ok: false,
      msg: 'Error de validacion.'
    });

  })

}


//BORRAR UN USUARIO
const deleteUser = (req, res) => {

  User.destroy({
    where: {
      id: req.params.id
    }

  //result devuelve un numero que representa la cantidad de items borrados
  }).then( result => {

    if (result >= 1) {
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
      msg: 'Error inesperado.'
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