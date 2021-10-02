const Comment = require('../models/Comment');


//OBTENER TODOS LOS COMENTARIOS
const getComments = (req, res) => {

  Comment.findAndCountAll({

    attributes: ['id', 'comment', 'movieId']

  }).then( comments => {

    res.json({
      ok: true,
      comments: comments
    })

  }).catch( err => {

    res.json({
      ok: false,
      msg: 'Error inesperado...'
    });

  })

}











module.exports = {
  getComments,

}