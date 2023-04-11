const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/index");

class Note extends Model {}
Note.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Note", // We need to choose the model name
    timestamps: true,
  }
);

// the defined model is the class itself
//console.log(Account === sequelize.models.Account); // true
module.exports = Note;
