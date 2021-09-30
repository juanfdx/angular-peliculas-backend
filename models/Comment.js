const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');


//modelo de Comment y validaciones de los campos
class Comment extends Model {}

Comment.init({


  rate: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {

      len: {
        args: [1, 1],
        msg: 'Debe ingresar un solo digito.'
      },
      isNumeric: {
        args: true,
        msg: 'Debe ingresar un numero entero.'
      }

    }  
  },
  comment: {
    type: DataTypes.TEXT,
  }


}, { sequelize , modelName: 'comment'})



module.exports = Comment;