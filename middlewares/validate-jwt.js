const jwt = require('jsonwebtoken');



const validateJWT = (req, res, next) => {

  //Leer el tokken
  const token = req.header('x-token');
  
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la peticion.'
    })
  }

  try {

    //verificamos el token y obtenemos el id del usuario uid
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    //establecemos en la req el uid
    req.uid = uid;

    next();
    
  } catch (error) {
      return res.status(401).json({
        ok: false,
        msg: 'Token no válido.'
      })
  }

}




module.exports = {
  validateJWT
}