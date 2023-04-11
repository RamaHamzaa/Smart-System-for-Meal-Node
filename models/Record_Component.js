const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/index");
var Food = require("./Food")
var Food_Component = require("./Food_Component")

class Record_Component extends Model {}
Record_Component.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    typeAmount: {
      type: DataTypes.ENUM("kilo","gram","liter","spoon","pinch","number"),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Record_Component", // We need to choose the model name
    timestamps: false,
  }
);

Food.hasMany(Record_Component) ;
Record_Component.belongsTo(Food, { onDelete: "CASCADE" });

Food_Component.hasMany(Record_Component) ;
Record_Component.belongsTo(Food_Component, { onDelete: "CASCADE" });

// the defined model is the class itself
//console.log(Account === sequelize.models.Account); // true
module.exports = Record_Component;
