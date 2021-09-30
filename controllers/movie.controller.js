const Movie = require('../models/Movie');
const Comment = require('../models/Comment');



//OBTENER TODAS LAS PELICULAS
const getTheMovies = (req, res) => {

  Movie.findAndCountAll({

    attributes: ['id', 'title', 'year', 'image', 'score']

  }).then( movies => {

    res.json(movies)

  }).catch( err => {

    res.json({
      ok: false,
      msg: 'Error inesperado...'
    });

  })

}

//CREAR UNA PELICULA
const createTheMovie = (req, res) => {

  const { title, year, image } = req.body;

  //Verificamos si la pelicula ya existe
  Movie.findOne({
    where: {
      title: title
    }

  }).then( movie => {

    if (movie) {

      return res.status(400).json({
        ok: false,
        msg: 'La pelicula ya existe en la base de datos.'
      });

    } else {

      Movie.create({
        title: title,
        year: year,
        image: image
      
      }).then( movie => {
      
        res.json({
          ok: true,
          movie
        })
      
      }).catch( err => {
      
        res.json({
          ok: false,
          msg: err.errors[0].message
        });
      
      })

    }

  })  

}

//OBTENER UNA PELICULA
const getTheMovie = (req, res) => {

  Movie.findByPk(
    req.params.id, 
    {attributes: ['id', 'title', 'year', 'image', 'score']}   

  ).then( movie => {

    if (!movie) {
      res.json({
        ok: false,
        msg: 'pelicula no encontrada.'
      })

    } else {
      res.json(movie);

    }

  }).catch( err => {

    res.json({
      ok: false,
      msg: 'Error inesperado...'
    });

  })

}

//EDITAR UNA PELICULA
const updateTheMovie = (req, res) => {

  Movie.update({
    title: req.body.title,
    year: req.body.year,
    image: req.body.image

  }, {
    where: {
      id: req.params.id
    }

  }).then( result => {
    
    if (result[0] === 1) {
      res.json({
        ok: true,
        msg: 'pelicula actualizada.'
      })

    } else {
      res.json({
        ok: false,
        msg: 'no se pudo actualizar la pelicula.'
      })

    }


  }).catch( err => {

    res.json({
      ok: false,
      msg: err.errors[0].message
    });

  })

}

//BORRAR UNA PELICULA
const deleteTheMovie = (req, res) => {

  //borrar comentarios de la pelicula
  Comment.destroy({

    where: {
      movieId: req.params.id
    }

  //resp devuelve un numero que representa la cantidad de items borrados
  }).then( resp => {
    //si es 0 es que la pelicula no tenia comentarios
    if (resp >= 0) {

      //borrar pelicula
      Movie.destroy({
        where: {
          id: req.params.id
        }

      }).then( result => {

        if (result >= 1) {
          res.json({
            ok: true,
            msg: 'pelicula borrada con exito.'
          })

        } else {
          res.json({
            ok: false,
            msg: 'no se pudo borrar la pelicula.'
          })

        }

      }).catch( err => {

        res.json({
          ok: false,
          msg: 'Error inesperado...'
        });

      })

      
    } else {

      res.json({
        ok: false,
        msg: 'Error inesperado... no se pudieron borrar los comentarios.'
      });
      
    }

  });


}

//OBTENER UNA PELICULA CON SUS COMENTARIOS
const getMovieAndComments = (req, res) => {

  Movie.findByPk(
    req.params.id, 
    {attributes: ['id', 'title', 'year', 'image', 'score']}   

  ).then( movie => {

    if (!movie) {
      res.json({
        ok: false,
        msg: 'pelicula no encontrada.'
      })

    } else {
  
      movie.getComments({ attributes: ['comment'] }).then( comments => {

        //creamos un array solo con los comentarios
        const onlyComments = comments.map( obj => obj = obj.comment);
        
        //creamos un nuevo objeto con la pelicula y sus comentarios
        const commentedMovie = {
            id: movie.id,
            title: movie.title,
            year: movie.year,
            image: movie.image,
            score: movie.score,
            comments: onlyComments
        }
        
        res.json(commentedMovie);

      })

    }

  }).catch( err => {

    res.json({
      ok: false,
      msg: 'Error inesperado...'
    });

  })

}

//CALIFICAR Y COMENTAR PELICULA
const rateAndCommentMovie = (req, res) => {

  const { rate, comment } = req.body;
  const movieId = req.params.id;

  //Creamos el comentario con la llave foranea
  Comment.create({
    rate: rate,
    comment: comment,
    movieId: movieId

  }).then( comment => {
    //buscamos la pelicula en relacion al comentario
    Movie.findByPk( movieId ).then( movie => {

      const nunRate = parseInt(comment.rate);
      const actualScore = movie.score;
      res.json([nunRate, actualScore])
      
      //TODO: sacar el score y validar el rate

      Movie.update({

        score: 23 //pondremos el score total

      }, {
        where: {
          id: movieId
        }
    
      }).then( respuesta => {
      // res.json(respuesta)

      })


    })

  }).catch( err => {

    res.json({
      ok: false,
      msg: err.errors[0].message
    });

  })

}



module.exports = {
  getTheMovies,
  createTheMovie,
  getTheMovie,
  updateTheMovie,
  deleteTheMovie,
  getMovieAndComments,
  rateAndCommentMovie
}