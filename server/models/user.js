'use strict';
const {
  Model
} = require('sequelize');
const bcryptPass = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Cuisine, {
        foreignKey: 'authorId'
      })
    }
  }
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true,
      validate : {
        notEmpty : {
          msg : "Email is required"
        },
        notNull : {
          msg : "Email is required"
        }, 
        isEmail : {
          msg : "Only email format is allowed"
        }
      }
    },
    password:  {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Password is required"
        },
        notNull : {
          msg : "Password is required"
        }, 
        len : {
          args : [5,100],
          msg : "Minimum Password 5 Characters"
        }
      }
    },
    role: {
      type : DataTypes.STRING,
      defaultValue : "Staff"
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    hooks : {
      beforeCreate : (USer, options) => {
        USer.password = bcryptPass.hashPassword(USer.password);
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};