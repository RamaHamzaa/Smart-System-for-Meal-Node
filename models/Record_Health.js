const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/index");
var Food = require("./Food")
var Health_Component = require("./Health_Component")

class Record_Health extends Model {}
Record_Health.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    rate: {
      type: DataTypes.INTEGER,
      validate: {
        max: 100,
        min: 0,
      }
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Record_Health", // We need to choose the model name
    timestamps: false,
  }
);

Food.hasMany(Record_Health) ;
Record_Health.belongsTo(Food, { onDelete: "CASCADE" });

Health_Component.hasMany(Record_Health) ;
Record_Health.belongsTo(Health_Component, { onDelete: "CASCADE" });

// the defined model is the class itself
//console.log(Account === sequelize.models.Account); // true
module.exports = Record_Health;
