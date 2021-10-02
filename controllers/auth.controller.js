const User = require('../models/User');
const bcrypt = require('bcryptjs');


//VERIFICAR CUENTA DE USUARIO
const authUser = (req, res) => {

  const { email, password } = req.body;

   //Verificar email
  User.findOne({
    where: {
      email: email
    }

  }).then( user => {

    if (!user) {

      return res.status(404).json({
        ok: false,
        msg: 'Email no encontrado.'
      });

    } else {

      //verificamos el password
      const validPassword = bcrypt.compareSync(password, user.password); 
      
      if (!validPassword) {

        return res.status(400).json({
          ok: false,
          msg: 'Contraseña no valida.'
        });

      }

      //Aqui se crearia el JWT:

      //Usuario aceptado
      res.json({
        ok: true,
        user
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
  authUser
  
}