const Movie = require('../models/Movie');


//OBTENER TODAS LAS PELICULAS
const getMovies = (req, res) => {

  Movie.findAndCountAll({

    attributes: ['id', 'title', 'year']

  }).then( movies => {

    res.json({
      ok: true,
      movies: movies
    })

  }).catch( err => {

    res.json({
      ok: false,
      msg: err
    });

  })

}

//CREAR UNA PELICULA
const createMovie = (req, res) => {

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
const getMovie = (req, res) => {

  Movie.findByPk(
    req.params.id, 
    {attributes: ['id', 'title', 'year', 'image']}   

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
      })

    }

  }).catch( err => {

    res.json({
      ok: false,
      msg: err
    });

  })

}

//EDITAR UNA PELICULA
const updateMovie = (req, res) => {

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
const deleteMovie = (req, res) => {

  Movie.destroy({
    where: {
      id: req.params.id
    }

  }).then( result => {

    if (result === 1) {
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
      msg: err
    });

  })

}


module.exports = {
  getMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie
}