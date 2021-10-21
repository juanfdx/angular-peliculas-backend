const Movie = require('../models/Movie');
const { Op } = require("sequelize");


 const getSearch = async (req, res) => {

  const param = req.params.param;

  const movie = await Movie.findAndCountAll({
    where:     {
      [Op.or]: [
        {
          title: {
            //Por titulo busca el que tenga el substring param (LIKE '%param%')
            [Op.substring]: param
          }
        },
        {
          year: {
            //Por año busca el que empiece por param (LIKE 'param%')
            [Op.startsWith]: param
          }
        }
      ]
    }


  });

  res.json({
    ok: true,
    movie
  })

 }



 module.exports = {
  getSearch
 }