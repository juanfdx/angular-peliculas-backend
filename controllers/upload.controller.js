const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Movie = require('../models/Movie');
const User = require('../models/User');


//borrar imagen
const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};


//SUBIR IMAGEN
const fileUpload = (req, res) => {

  const type = req.params.type;
  const id = req.params.id;

  //validamos el tipo, si va a ser de movies o de users
  const validTypes = ['movies', 'users'];

  if (!validTypes.includes(type)) {
    
    return res.status(400).json({
      ok: false,
      msg: 'Tipo de peticion no valida.'
    })

  }

  //validamos que exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No se subio ningun archivo.'
    })
  }

  //Procesamos la imagen
  const file = req.files.image;

  //obtenemos la extension del archivo
  const cutName = file.name.split('.'); //name.jpg
  const extension = cutName[cutName.length - 1];

  //Validar extension
  const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
  if (!validExtensions.includes(extension)) {
    
    return res.status(400).json({
      ok: false,
      msg: 'No es una extension permitida.'
    })

  }

  //Generar el nombre del archivo con su extension
  const fileName = `${ uuidv4() }.${ extension }`;

  //Generar el path en donde se guardara la imagen
  const path = `./uploads/${ type }/${ fileName }`;

  //Mover la imagen
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: 'Error al mover la imagen'
      });
    }


    //ACA ACTUALIZAMOS LA BASE DE DATOS
    switch (type) {
      case 'movies':

        Movie.findByPk(
          id,   
      
        ).then( movie => {

          //si la pelicula tiene una imagen previa, entonces la borramos de la carpeta
          const oldPath = `./uploads/movies/${ movie.image }`;
          deleteImage(oldPath);

          //actualizamos la pelicula
          Movie.update({
            image: fileName
        
          }, {
            where: {
              id: id
            }
        
          }).then( result => {

            if (result[0] === 1) {
              res.json({
                ok: true,
                msg: 'Imagen actualizada.'
              })
        
            } else {
              res.json({
                ok: false,
                msg: 'no se pudo actualizar la imagen.'
              })
        
            }

          }).catch( err => {

            res.json({
              ok: false,
              msg: 'Error inesperado.'
            });
        
          })
   

        }).catch( err => {

          res.json({
            ok: false,
            msg: 'Error inesperado.'
          });
      
        })
        
        break;

      case 'users':   

      User.findByPk(
        id,   
    
      ).then( user => {

        //si el usuario tiene una imagen previa, entonces la borramos de la carpeta
        const oldPath = `./uploads/users/${ user.image }`;
        deleteImage(oldPath);

        //actualizamos el usuario
        User.update({
          image: fileName
      
        }, {
          where: {
            id: id
          }
      
        }).then( result => {

          if (result[0] === 1) {
            res.json({
              ok: true,
              msg: 'Imagen actualizada.'
            })
      
          } else {
            res.json({
              ok: false,
              msg: 'no se pudo actualizar la imagen.'
            })
      
          }

        }).catch( err => {

          res.json({
            ok: false,
            msg: 'Error inesperado.'
          });
      
        })
 

      }).catch( err => {

        res.json({
          ok: false,
          msg: 'Error inesperado.'
        });
    
      })
      
      break;
    
      default:
        break;
    }


  });


}


//OBTENER IMAGEN
const getFile = (req, res) => {

  const type = req.params.type;
  const image = req.params.image;

  const pathImage = path.join(__dirname, `../uploads/${type}/${image}`);

  //Imagen por defecto si no existe una imagen o el path de imagen
  if (fs.existsSync(pathImage)) {
    res.sendFile(pathImage);
    
  } else {
    const pathImage = path.join(__dirname, `../uploads/no-image.jpg`);
    res.sendFile(pathImage);

  }

}


module.exports = {
  fileUpload,
  getFile
}