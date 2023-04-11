const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/index");
var Food = require("./Food")

class Categorize extends Model {}
Categorize.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nameAr: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nameEn: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull : false
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Categorize", // We need to choose the model name
    timestamps: false,
  }
);

Categorize.hasMany(Food) ;
Food.belongsTo(Categorize, { onDelete: "CASCADE" });

// the defined model is the class itself
//console.log(Account === sequelize.models.Account); // true
module.exports = Categorize;
