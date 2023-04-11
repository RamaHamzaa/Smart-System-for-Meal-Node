const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/index");

class Rate extends Model {}
Rate.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    rate: {
        type: DataTypes.ENUM('0','1','2','3','4','5'), 
        allowNull: false
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Rate", // We need to choose the model name
    timestamps: true,
  }
);

// the defined model is the class itself
//console.log(Account === sequelize.models.Account); // true
module.exports = Rate;
