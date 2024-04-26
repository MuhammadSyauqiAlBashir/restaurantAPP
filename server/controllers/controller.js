const bcryptPass = require("../helpers/bcrypt");
const Token = require("../helpers/jwt");
const { User, Cuisine, Category } = require("../models");
const cloudinary = require("cloudinary").v2;
const { Op } = require("sequelize");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

class Controller {
  static async addCuisine(req, res, next) {
    try {
      let { name, description, price, imgUrl, categoryId } = req.body;
      let authorId = req.user.id;
      let newCuisine = await Cuisine.create({
        name,
        description,
        price,
        imgUrl,
        categoryId,
        authorId,
      });
      res.status(201).json(newCuisine);
    } catch (error) {
      next(error);
    }
  }
  static async getCuisine(req, res,next) {
    try {
      let allCuisine = await Cuisine.findAll({
        include: [
          {
            model : User,
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model : Category
          }
        ]  
      });
      res.status(200).json(allCuisine);
    } catch (error) {
      next(error);
    }
  }
  static async getPubCuisine(req, res, next) {
    try {
      let { filter, page, sort, search } = req.query;
      let queryCommand = {
        where: {},
      };
      if (search) {
        queryCommand.where.name = { [Op.iLike]: `%${search}%` };
      }
      if (filter) {
        queryCommand.where.categoryId = filter;
      }
      if (sort) {
        let [order, sortwith] = sort.split(",");
        queryCommand.order = [[order, sortwith]];
      }else {
      
        queryCommand.order = [["id", "asc"]]
      }
      let limit = 10;
      let pageNumber = 1;

      if (page) {
        if (page.size) {
          limit = +page.size;
          queryCommand.limit = limit;
        } else {
          queryCommand.limit = limit;
        }
        if (page.number) {
          pageNumber = +page.number;
          queryCommand.offset = limit * (pageNumber - 1);
        } else {
          queryCommand.offset = limit * (pageNumber - 1);
        }
      } else {
        queryCommand.limit = limit;
        queryCommand.offset = limit * (pageNumber - 1);
      }
      let { count, rows } = await Cuisine.findAndCountAll(queryCommand);
      res.status(200).json({
        page: pageNumber,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: limit,
      });
    } catch (error) {
      next(error);
    }
  }
  static async oneCuisine(req, res, next) {
    try {
      let oneCuisine = await Cuisine.findByPk(req.params.id);
      if (!oneCuisine) throw { name: "errorNotFound" };
      res.status(200).json(oneCuisine);
    } catch (error) {
      next(error);
    }
  }
  static async onePubCuisine(req, res, next) {
    try {
      let oneCuisine = await Cuisine.findByPk(req.params.id);
      if (!oneCuisine) throw { name: "errorNotFound" };
      res.status(200).json(oneCuisine);
    } catch (error) {
      next(error);
    }
  }
  static async updateCuisine(req, res, next) {
    try {
      let id = req.params.id;
      let cuisine = await Cuisine.findByPk(id);
      if (!cuisine) throw { name: "errorNotFound" };
      let { name, description, price, imgUrl, categoryId, authorId } = req.body;
      await cuisine.update({
        name,
        description,
        price,
        imgUrl,
        categoryId,
        authorId,
      });
      res.status(200).json(cuisine);
    } catch (error) {
      next(error);
    }
  }
  static async deleteCuisine(req, res, next) {
    try {
      let id = req.params.id;
      let cuisine = await Cuisine.findByPk(id);
      if (!cuisine) throw { name: "errorNotFound" };
      await Cuisine.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({ message: `${cuisine.name} success to delete` });
    } catch (error) {
      next(error);
    }
  }
  static async addCategory(req, res, next) {
    try {
      let { name } = req.body;
      let category = await Category.create({
        name,
      });
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }
  static async getCategory(req, res, next) {
    try {
      let category = await Category.findAll();
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
  static async editCategory(req, res, next) {
    try {
      let id = req.params.id;
      let category = await Category.findByPk(id);
      if (!category) throw { name: "errorNotFound" };
      let { name } = req.body;
      await category.update({
        name,
      });
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      let id = req.params.id;
      let category = await Category.findByPk(id);
      if (!category) throw { name: "errorNotFound" };
      await category.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({ message: `${category.name} success to delete` });
    } catch (error) {
      next(error);
    }
  }
  static async addUser(req, res, next) {
    try {
      const user = await User.create(req.body);
      user.set({
        password: "",
      });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "EmailRequired" };
      if (!password) throw { name: "PasswordRequired" };
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) throw { name: "InvalidLogin" };
      const checkPass = bcryptPass.comparePassword(password, user.password);
      if (!checkPass) throw { name: "InvalidLogin" };
      const payload = { id: user.id };
      const newToken = Token.genToken(payload);
      res.status(200).json({ message: "Success Login", newToken });
    } catch (error) {
      next(error);
    }
  }
  static async updateImageUrl(req, res, next) {
    try {
      const id = req.params.id;
      const cuisine = await Cuisine.findByPk(id);
      if (!cuisine) throw { name: "errorNotFound" };
      if (!req.file) throw { name: "fileRequired" };
      const base64 = req.file.buffer.toString("base64");
      const url = `data:${req.file.mimetype};base64,${base64}`;
      const result = await cloudinary.uploader.upload(url);
      await cuisine.update({
        imgUrl: result.secure_url,
      });
      res
        .status(200)
        .json({ message: `image ${cuisine.name} success to update` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
