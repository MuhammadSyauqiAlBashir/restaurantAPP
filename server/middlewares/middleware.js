const Token = require("../helpers/jwt");
const { User, Cuisine } = require("../models");
const multer = require("multer");

class middleware {
  static async authentication(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw { name: "InvalidToken" };
      const [type, token] = authorization.split(" ");
      if (type !== "Bearer") throw { name: "InvalidToken" };
      const { id } = Token.verify(token);
      const user = await User.findByPk(id);
      if (!user) throw { name: "InvalidToken" };
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  }
  static async authorizationAdminOnly(req, res, next) {
    try {
      if (req.user.role === "Admin") {
        next();
      } else {
        let data = await Cuisine.findByPk(req.params.id);
        if (req.user.id === data.authorId) {
          next();
        } else {
          throw { name: "accessNotAllowed" };
        }
      }
    } catch (error) {
      next(error);
    }
  }
  static async authorizationAddUser(req, res, next) {
    try {
      console.log(req.user);
      if (req.user.role === "Admin") {
        next();
      } else {
        throw { name: "accessNotAllowed" };
      }
    } catch (error) {
      next(error);
    }
  }
  static errorHandler(err, req, res, next) {
    switch (err.name) {
      case "SequelizeValidationError":
      case "SequelizeUniqueConstraintError":
        res.status(400).json(
          err.errors.map((err) => {
            return err.message;
          })
        );
        break;
      case "EmailRequired":
        res.status(400).json({ message: "Email is required" });
        break;
      case "PasswordRequired":
        res.status(400).json({ message: "Password is required" });
        break;
      case "InvalidLogin":
        res.status(401).json({ message: "Invalid Email/Password" });
        break;
      case "errorNotFound":
        res.status(404).json({ message: "errorNotFound" });
        break;
      case "fileRequired":
        res.status(400).json({ message: "Please input File" });
        break;
      case "InvalidToken":
      case "JsonWebTokenError":
        res.status(401).json({ message: "Invalid Token" });
        break;
      case "accessNotAllowed":
        res.status(403).json({ message: "Forbidden" });
        break;
      default:
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
        break;
    }
  }
}

const upload = multer({
  storage: multer.memoryStorage(),
});

module.exports = { middleware, upload };
