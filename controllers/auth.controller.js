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

      //Para no mostrar el password , creamos un user sin password
      user = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image
      }

      //Aqui generamos el JWT:
      generateJWT(user.id).then( token => {
        
              res.json({
                ok: true,
                user: user,
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