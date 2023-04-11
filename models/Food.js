const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/index");
var Rate = require("./Rate")

class Food extends Model {}
Food.init(
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
    descriptionAr: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descriptionEn: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    typeFood: {
      type: DataTypes.ENUM("breakfast", "lunch", "dinner"),
      allowNull: false,
    },
    season: {
        type: DataTypes.ENUM("summer", "fall", "winter", "spring"),
        allowNull: false,
    },
    methodString: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    methodLink: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    makeIn: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numberPerson: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    note: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull : false
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Food", // We need to choose the model name
    timestamps: true,
  }
);

Food.hasMany(Rate) ;
Rate.belongsTo(Food, { onDelete: "CASCADE" });


// the defined model is the class itself
//console.log(Account === sequelize.models.Account); // true
module.exports = Food;
