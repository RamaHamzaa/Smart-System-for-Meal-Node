const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/index");
const Account = require("./Account");

class User extends Model {}
User.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    latePosition : {
      type : DataTypes.DECIMAL(20,20),
      allowNull : false
    },
    longPosition : {
        type : DataTypes.DECIMAL(20,20),
        allowNull : false
    },
    token : {
        type : DataTypes.TEXT,
        allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull : true
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
    timestamps: true,
  }
);

User.hasOne(Account);
Account.belongsTo(User, { onDelete: "CASCADE" });

// the defined model is the class itself
//console.log(User === sequelize.models.User); // true
module.exports = User;
