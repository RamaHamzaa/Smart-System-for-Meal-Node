var express = require('express');
var router = express.Router();
var Account = require("../models/Account");
var User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post('/delete/account',async function(req, res, next){
  var data = req.body;
  Account.destroy({ where: { id: data.idAccount } });
  User.destroy({ where: { id: data.idUser } });
  res.send({done : true});
});

router.post('/update/password',async function(req, res, next){
  var data = req.body;
  var newPassword = await bcrypt.hash(data.password, 10)
  Account.update({password: newPassword},
    { where: { email: data.email } });
    res.send({done : true});
});

router.post('/update/email',async function(req, res, next){
  var data = req.body;
  Account.update({email: data.email},
    { where: { email: data.oldEmail} });
    res.send({done : true});
});

router.post('/update/info/user',async function(req, res, next){
  var data = req.body;
  User.update({
    firstName : data.firstName ,
    lastName : data.lastName ,
    phoneNumber : data.phoneNumber ,
    latePosition : data.latePosition ,
    longPosition : data.longPosition ,
    token : data.token ,
    image : data.image ,
  },
    { where: { id: data.id } });
    res.send({done : true});
});

router.get('/get/acount/email/:email', function(req, res, next) {
  console.log("fdssdfsdfsfd :     "+req.params.email);
    var email = req.params.email;
    Account.findOne({where : {email : email}}).then((account)=>{
        if(!account){
            res.status(httpStatus.BAD_REQUEST).send({
            message: "email is not correct",
          });
        }else{
            res.send(account);
        }
      });
});

router.get('/get/user/id/:id', function(req, res, next) {
  console.log("fdssdfsdfsfd :     "+req.params.id);
    var id = req.params.id;
    User.findOne({where : {id : id}}).then((user)=>{
        if(!user){
            res.status(httpStatus.BAD_REQUEST).send({
            message: "email is not correct",
          });
        }else{
            res.send(user);
        }
      });
});

router.get('/get/all/user', function(req, res, next) {
    Account.findAll().then((account)=>{
        if(!account){
            res.status(httpStatus.BAD_REQUEST).send({
            message: "Error",
          });
        }else{
            res.send(account);
        }
      });
});


module.exports = router;
