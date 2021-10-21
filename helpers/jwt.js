const jwt = require('jsonwebtoken');

//Generar el JWT
const generateJWT = (id) => {

  return new Promise((resolve, reject) => {
    
    const payload = {
      uid: id
    }
  
    jwt.sign( payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    }, (err, token) => {
  
      if (err) {
        console.log(err);
        reject('No se pudo generar el JWT');
      
      } else {
        resolve(token);
      }
  
    });

  });

}



module.exports = {
  generateJWT
}