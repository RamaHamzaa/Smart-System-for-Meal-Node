const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Account = require("../models/Account");
const httpStatus = require("../constants/httpStatus");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signUp = async (req, res, next) => {
  const data = req.body;
  const firstName = data.firstName;
  const lastName = data.lastName;
  const phoneNumber = data.phoneNumber;
  const latePosition = data.latePosition;
  const longPosition = data.longPosition;
  const token = data.token;
  const image = data.image;
  const email = data.email;
  const password = await bcrypt.hash(data.password, 10);
  
  var canCreate = true;
  Account.findOne({ where: { email } }).then((account) => {
    if (account){
      canCreate = false ;
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: "email is already exist " });
    }else {
      User.create(
        {
          firstName : firstName ,
          lastName : lastName ,
          phoneNumber : phoneNumber ,
          latePosition : latePosition ,
          longPosition : longPosition ,
          token : token ,
          image : image ,
          Account: {
            email: email,
            password: password,
          },
        },
        { include: [User.hasOne(Account)] }
      )
        .then((user) => {
          const token = jwt.sign(
            {
              userId: user.id,
              type: "user",
            },
            process.env.JWT_SECRET
          );
          Account.findOne({where : {email: email}}).then(info => {
            res.status(httpStatus.CREATED).send({ id : user.id });
          });
          const name = `${firstName} ${lastName}`;
          // res.status(httpStatus.CREATED).send({ id : user.id });
        })
        .catch((error) => {
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error });
        });
    }
  });
};


exports.login = (req, res, next) => {
  const data = req.query;
  const email = data.email;
  const password = data.password;
  Account.findOne({
    where: { email },
    include: [{ model: User, attributes: ["id", "firstName", "lastName"] }],
  })
    .then(async (account) => {
      if (!account)
        return res.status(httpStatus.BAD_REQUEST).send({
          message: "email or password is not correct",
        });
      isMatch = await bcrypt.compare(password, account.password);
      if (!isMatch) {
        return res.status(httpStatus.BAD_REQUEST).send({
          message: "email or password is not correct",
        });
      }
      const token = jwt.sign(
        {
          userId: account.User.id,
          type: "user",
        },
        process.env.JWT_SECRET
      );
      const name = `${account.User.dataValues.firstName} ${account.User.dataValues.lastName}`;
      res.status(httpStatus.OK).send({ id : account.id});
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error });
    });
};
