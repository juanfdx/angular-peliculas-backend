const Comment = require('../models/Comment');


//OBTENER TODOS LOS COMENTARIOS
const getComments = (req, res) => {

  Comment.findAndCountAll({

    attributes: ['id', 'rate', 'comment']

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

//CREAR UN COMENTARIO
const createComment = (req, res) => {

  const { rate, comment } = req.body;

  //Creamos el comentario
  Comment.create({
    rate: rate,
    comment: comment

  }).then( result => {

    res.json({
      ok: true,
      comment: result
    })

  }).catch( err => {

    res.json({
      ok: false,
      msg: err.errors[0].message
    });

  })

}









module.exports = {
  getComments,
  createComment

}