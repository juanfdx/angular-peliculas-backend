const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');


//modelo de User y validaciones de los campos
class User extends Model {}

User.init({

  firstName: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {

      notNull: {
        msg: 'Debe escribir un nombre.'
      },
      notEmpty: {
        args: true,
        msg: 'Debe escribir un nombre.'
      },
      is: {
        args: /^[a-zA-Z ]+$/i,
        msg: 'EL nombre solo puede contener letras.'
      },
      len: {
        args: [3, 30],
        msg: 'El nombre debe contener entre 3 y 255 caracteres.'
      },

    }
  },

  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {

      notNull: {
        msg: 'Debe escribir un apellido.'
      },
      is: {
        args: /^[a-zA-Z ]+$/i,
        msg: 'EL apellido solo puede contener letras.'
      },
      len: {
        args: [3, 50],
        msg: 'El apellido debe contener entre 3 y 255 caracteres.'
      }

    }
  },

  email: {
    type: DataTypes.STRING,
    validate: {

      is: {
        args: "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",
        msg: 'Debe ser un email valido.'
      },

    }
  },

  password: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {

      notNull: {
        msg: 'El password no puede ser Nulo.'
      },

    }
  },

  //1 es admin, 0 es normal
  role: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  image: {
    type: DataTypes.STRING,
    set(value) {
      value ? this.setDataValue('image', value) : this.setDataValue('image', 'no-image.jpg');
      
    }
  },


}, { sequelize , modelName: 'user'})



module.exports = User;