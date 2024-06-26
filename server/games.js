const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const Game = sequelize.define("Game", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  release_date: { type: DataTypes.INTEGER, allowNull: false },
  developer: { type: DataTypes.STRING, allowNull: false },
  publisher: { type: DataTypes.STRING, allowNull: false },
  platform: { type: DataTypes.STRING, allowNull: false },
  genre: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  esrb_rating: { type: DataTypes.STRING, allowNull: false },
  image_url: { type: DataTypes.STRING, allowNull: true },
});

module.exports = Game;
