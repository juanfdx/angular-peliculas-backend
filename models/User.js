const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');


//modelo de user y validaciones de los campos
class User extends Model {}

User.init({

  name: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {

      notNull: {
        msg: 'Debe escribir un nombre.'
      },
      isAlpha: {
        args: true,
        msg: 'EL nombre solo puede contener letras.'
      },
      len: {
        args: [3, 255],
        msg: 'El nombre debe contener entre 3 y 255 caracteres.'
      }

    }
  },

  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {

      notNull: {
        msg: 'Debe escribir un apellido.'
      },
      isAlpha: {
        args: true,
        msg: 'EL apellido solo puede contener letras.'
      },
      len: {
        args: [3, 255],
        msg: 'El apellido debe contener entre 3 y 255 caracteres.'
      }

    }
  },

  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: {
        args: true,
        msg: 'Debe ser un email valido.'
      }
    }
  },

  password: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {

      notNull: {
        msg: 'El password no puede ser Nulo.'
      },

      isAlphanumeric: {
        args: true,
        msg: 'Solo se permiten letras y numeros.'
      },

      len: {
        args: [6, 12],
        msg: 'El password debe ser entre 6 y 12 caracteres.'
      },

    }
  },

  //1 es admin, 0 es normal
  role: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }


}, { sequelize , modelName: 'user'})



module.exports = User;