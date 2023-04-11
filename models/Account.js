const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/index");
const Rate = require("./Rate");
const Note = require("./Note");

class Account extends Model {}
Account.init(
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // type: {
    //   type: DataTypes.ENUM("user", "admin", "control"),
    // },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Account", // We need to choose the model name
    timestamps: true,
  }
);

Account.hasMany(Rate) ;
Rate.belongsTo(Account, { onDelete: "CASCADE" });

Account.hasMany(Note) ;
Note.belongsTo(Account, { onDelete: "CASCADE" });

// the defined model is the class itself
//console.log(Account === sequelize.models.Account); // true
module.exports = Account;
