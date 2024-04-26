'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    static associate(models) {
      Cuisine.belongsTo(models.User, {
        foreignKey: 'authorId'
      })
      Cuisine.belongsTo(models.Category,{
        foreignKey: 'categoryId'
      })
    }
    get rupiah(){
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(this.price)
    }
  }
  Cuisine.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Name is required"
        },
        notNull : {
          msg : "Name is required"
        }, 
      }
    },
    description: {
      type : DataTypes.TEXT,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Description is required"
        },
        notNull : {
          msg : "Description is required"
        }, 
      }
    },
    price: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Price is required"
        },
        notNull : {
          msg : "Price is required"
        }, 
        min : {
          args : 10000,
          msg : "Minimum Price is Rp. 10,000.00"
        }
      }
    },
    imgUrl: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Image Url is required"
        },
        notNull : {
          msg : "Image Url is required"
        }, 
      }
    },
    categoryId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Category ID is required"
        },
        notNull : {
          msg : "Category ID is required"
        }, 
      }
    },
    authorId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Author ID is required"
        },
        notNull : {
          msg : "Author ID is required"
        }, 
      }
    }
  }, {
    sequelize,
    modelName: 'Cuisine',
  });
  return Cuisine;
};