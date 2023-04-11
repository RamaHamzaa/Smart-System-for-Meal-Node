const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/index");

class Valid_Model extends Model {}
Valid_Model.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {isEmail: true},
      },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Valid_Model", // We need to choose the model name
    timestamps: false,
  }
);

// the defined model is the class itself
//console.log(Account === sequelize.models.Account); // true
module.exports = Valid_Model;
