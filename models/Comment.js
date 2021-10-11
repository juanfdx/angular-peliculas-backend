const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');


//modelo de Comment y validaciones de los campos
class Comment extends Model {}

Comment.init({

  comment: {
    type: DataTypes.TEXT,
  },
  
  userName: {
    type: DataTypes.STRING,

  },


}, { sequelize , modelName: 'comment'})



module.exports = Comment;