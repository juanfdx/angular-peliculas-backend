const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


//VERIFICAR CUENTA DE USUARIO
const login = (req, res) => {

  const { email, password } = req.body;

   //Verificar email
  User.findOne({
    where: {
      email: email
    },


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

      const userId = user.id;
      //Aqui generamos el JWT:
      generateJWT(user.id).then( token => {
        
              res.json({
                ok: true,
                id: userId,
                token 
              })

      });



    }

  }).catch( err => {

    res.json({
      ok: false,
      msg: 'Error inesperado.'
    });

  })





}





module.exports = {
  login
  
}