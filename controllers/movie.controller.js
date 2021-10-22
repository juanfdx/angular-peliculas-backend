const Movie = require('../models/Movie');
const Comment = require('../models/Comment');


//OBTENER TODAS LAS PELICULAS CON PAGINACION
const getAllMovies = (req, res) => {

  //paginacion, si no viene "desde" sera 0 y "limite" sera 8
  const desde = parseInt(req.query.desde) || 0;
  const limite = parseInt(req.query.limite) || 8;


  Movie.findAndCountAll({
    
    limit: limite,
    offset: desde,
    order: [['title', 'ASC']],
    attributes: ['id', 'title', 'year', 'image', 'average', 'ratings']

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

  const { title, year } = req.body;

  //hacemos que a cada palabra del titulo su primera letra sea mayuscula
  const arr = title.split(" "); 

  const arr2 = arr.map( item => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  })
  
  const capTitle = arr2.join(' ');

  //Verificamos si la pelicula ya existe
  Movie.findOne({
    where: {
      title: capTitle
    }

  }).then( movie => {

    if (movie) {

      return res.status(400).json({
        ok: false,
        msg: 'La pelicula ya existe en la base de datos.'
      });

    } else {

      Movie.create({
        title: capTitle,
        year: year,
        image:'no-image.jpg'
      
      }).then( movie => {
      
        res.json({
          ok: true,
          movie
        })
      
      }).catch( err => {
      
        res.json({
          ok: false,
          msg: 'Error inesperado...'
        });
      
      })

    }

  }).catch( err => {
      
    res.json({
      ok: false,
      msg: 'Error inesperado...'
    });
  
  }) 

}


//OBTENER UNA PELICULA
const getTheMovie = (req, res) => {

  Movie.findByPk(
    req.params.id, 
    {attributes: ['id', 'title', 'year', 'image', 'average']}   

  ).then( movie => {

    if (!movie) {
      res.json({
        ok: false,
        msg: 'pelicula no encontrada.'
      })

    } else {
      res.json({
        ok: true,
        movie
      });

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

  const { title, year } = req.body;

  //hacemos que a cada palabra del titulo su primera letra sea mayuscula
  const arr = title.split(" "); 

  const arr2 = arr.map( item => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  })
  
  const capTitle = arr2.join(' ');

  Movie.update({
    title: capTitle,
    year: year

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
      msg: 'Error de validacion.'
    });

  })

}


//BORRAR UNA PELICULA
const deleteTheMovie = (req, res) => {

  //borrar primero los comentarios de la pelicula
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

//OBTENER UNA PELICULA CON SUS COMENTARIOS Y PAGINACION COMENTARIOS
const getMovieAndComments = (req, res) => {

    //paginacion, si no viene "desde" sera 0
    const desde = parseInt(req.query.desde) || 0;
    //no usaremos limite pq la consulta se hace desde un metodo magico y no trae count

  Movie.findByPk(
    req.params.id, 
    {attributes: ['id', 'title', 'year', 'image', 'average', 'ratings']}   

  ).then( movie => {
    
    if (!movie) {
      res.json({
        ok: false,
        msg: 'pelicula no encontrada.'
      })

    } else {

      //metodo magico por la asociacion de tablas
      movie.getComments({      
        offset: desde,
        attributes: ['comment', 'userName', 'createdAt'] 
      }).then( comments => {

        const countComments = comments.length;     
        
        //creamos un nuevo objeto con la pelicula y sus comentarios
        const commentedMovie = {
            id: movie.id,
            title: movie.title,
            year: movie.year,
            image: movie.image,
            average: movie.average,
            ratings: movie.ratings,
            countComments: countComments,
            comments: comments
        }
        
        res.json(commentedMovie);

      }).catch( err => {

        res.json({
          ok: false,
          msg: 'Error inesperado...'
        });
    
      })
    }

  }).catch( err => {

    res.json({
      ok: false,
      msg: 'Error inesperado2...'
    });

  })
}


//COMENTAR PELICULA
const commentTheMovie = (req, res) => {

  let comment  = req.body.comment;
  let userName  = req.body.userName; //viene del usuario logeado
  const movieId = req.params.id; //vine en la url
  

  //si comment viene vacio, no creamos el comentario
  if (!comment) {
    
    return res.json({
      ok: false,
      msg: 'Comentario vacio, no se creó comentario.'
    });
  }

  //Creamos el comentario y agregamos al usuario
  Comment.create({
    comment: comment,
    movieId: movieId,
    userName: userName

  }).then( comment => {

    res.json({
      ok: true,
      msg: 'Comentario creado con exito.'
    });

  }).catch( err => {

    res.json({
      ok: false,
      msg: 'Error inesperado...',
      err
    });

  })

}


//CALIFICAR PELICULA
const rateTheMovie = (req, res) => {

  let rate  = parseInt(req.body.rate);
  const movieId = req.params.id;

  //si rate "NO" es un numero entre 1 y 9 
  if (!(/^[0-9]+$/.test(rate) && (rate < 11) && (rate != 0))) {

    return res.json({
      ok: false,
      msg: 'No se calificó la pelicula.'
    });

  }

  //Obtenemos la pelicula a calificar
  Movie.findByPk(
    movieId, 
    {attributes: ['score', 'ratings', 'average']}   

  ).then( movie => {

    let score = movie.score;
    let ratings = movie.ratings;

    //guardamos tanto la suma como la cantidad de votos
    let newScore = score + rate;
    ratings++;
    
    //calculamos el average y lo guardamos
    let average = newScore / ratings;

    //Actualizamos el score de la pelicula
    Movie.update({
      score: newScore,
      ratings: ratings,
      average: average.toFixed(1)
  
    }, {
      where: {
        id: movieId
      }
  
    }).then( result => {

      if (result[0] === 1) {
        res.json({
          ok: true,
          msg: 'voto realizado.'
        })
  
      } else {
        res.json({
          ok: false,
          msg: 'no se pudo procesar el voto.'
        })
  
      }

    }).catch( err => {

      res.json({
        ok: false,
        msg: 'Error inesperado...'
      });
  
    })

  }).catch( err => {

    res.json({
      ok: false,
      msg: 'No se encontró pelicula.'
    });

  })

}





module.exports = {
  getAllMovies,
  createTheMovie,
  getTheMovie,
  updateTheMovie,
  deleteTheMovie,
  getMovieAndComments,
  commentTheMovie,
  rateTheMovie
}