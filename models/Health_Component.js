const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/index");

class Health_Component extends Model {}
Health_Component.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nameHealthComponent: {
        type: DataTypes.STRING, 
        allowNull: false
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Health_Component", // We need to choose the model name
    timestamps: false,
  }
);

// the defined model is the class itself
//console.log(Account === sequelize.models.Account); // true
module.exports = Health_Component;
