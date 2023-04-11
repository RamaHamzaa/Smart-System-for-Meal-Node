var express = require('express');
var router = express.Router();
var Rate = require("../models/Rate");
var Food = require("../models/Food");
var Component = require("../models/Food_Component");
var RecordComponent = require("../models/Record_Component");
var Health = require("../models/Health_Component");
var RecordHealth = require("../models/Record_Health");
const { on } = require('nodemailer/lib/xoauth2');

router.post('/add/rate',function (req, res, next) {
    var data = req.body ;
    Rate.create({
        rate : data.rate,
        AccountId : data.AccountId,
        FoodId : data.FoodId
    });
    res.send({done : true});
});

router.post('/remove/rate',function (req, res, next) {
    var data = req.body ;
    Rate.destroy({ where: { AccountId : data.AccountId , FoodId : data.FoodId} });
    res.send({done : true});
});

router.get('/get/like/food/user/:id',function (req, res, next) {
    var userId = req.params.id ;
    var allFoodLike = [];
    Rate.findAll({where : {AccountId : userId}}).then((rate)=>{
        if(!rate){
            res.status(httpStatus.BAD_REQUEST).send({
                message: "No Ratting Founded",
              });
        }else{
            res.send(rate);
        }
    });
});

router.post('/drop/food',async function (req, res, next) {
    var data = req.body ;

    await RecordComponent.findAll({where : {FoodId : data.id}}).then((component) => {
        component.forEach(element => {
            Component.destroy({where : {id : element.FoodComponentId}});
            RecordComponent.destroy({where : {FoodId : data.id}});
        });
    });

    await RecordHealth.findAll({where : {FoodId : data.id}}).then((component) => {
        component.forEach(element => {
            Health.destroy({where : {id : element.HealthComponentId}});
            RecordHealth.destroy({where : {FoodId : data.id}});
        });
    });

    await Food.destroy({where : {id : data.id}});
    
    res.send({done : true});
});

router.post('/drop/component',function (req, res, next) {
    var data = req.body ;
    RecordComponent.destroy({where : {FoodComponentId : data.id}});
    Component.destroy({where : {id : data.id}});
    res.send({done : true});
});

router.post('/drop/health',function (req, res, next) {
    var data = req.body ;
    RecordHealth.destroy({where : {HealthComponentId : data.id}});
    Health.destroy({where : {id : data.id}});
    res.send({done : true});
});

router.post('/add/food',function (req, res, next){
    var data = req.body;
    Food.create({
        nameAr : data.nameAr,
        nameEn : data.nameEn,
        descriptionAr : data.descriptionAr,
        descriptionEn : data.descriptionEn,
        typeFood : data.typeFood,
        season : data.season,
        methodString : data.methodString,
        methodLink : data.methodLink,
        price : data.price,
        makeIn : data.makeIn,
        numberPerson : data.numberPerson,
        note : data.note,
        image : data.image,
        CategorizeId : data.CategorizeId
    });
    res.send({done : true});
});

router.post('/add/component',function (req, res, next) {
    var data = req.body ;
    Component.create({
        image : data.image ,
        nameFoodComponent : data.nameFoodComponent ,
    }).then(component=>{
        RecordComponent.create({
            typeAmount : data.typeAmount,
            amount : data.amount ,
            FoodId : data.FoodId ,
            FoodComponentId : component.id ,
        });
    });
    res.send({done : true});
});

router.post('/add/health',function (req, res, next) {
    var data = req.body ;
    Health.create({
        nameHealthComponent : data.nameHealthComponent ,
    }).then(component=>{
        RecordHealth.create({
            rate : data.rate ,
            FoodId : data.FoodId ,
            HealthComponentId : component.id ,
        });
    });
    res.send({done : true});
});

router.post('/update/component',function (req, res, next) {
    var data = req.body ;
    Component.update({
        image : data.image ,
        nameFoodComponent : data.nameFoodComponent ,
    },{where : {id :data.id}}).then(component=>{
        RecordComponent.update({
            typeAmount : data.typeAmount,
            amount : data.amount ,
        },{where : {FoodComponentId :data.id}});
    });
    res.send({done : true});
});

router.post('/update/health',function (req, res, next) {
    var data = req.body ;
    Health.update({
        nameHealthComponent : data.nameHealthComponent ,
    },{where : {id :data.id}}).then(component=>{
        RecordHealth.update({
            rate : data.rate ,
        },{where : {HealthComponentId :data.id}});
    });
    res.send({done : true});
});

router.post('/update/food',function (req, res, next){
    var data = req.body;
    Food.update({
        nameAr : data.nameAr,
        nameEn : data.nameEn,
        descriptionAr : data.descriptionAr,
        descriptionEn : data.descriptionEn,
        typeFood : data.typeFood,
        season : data.season,
        methodString : data.methodString,
        methodLink : data.methodLink,
        price : data.price,
        makeIn : data.makeIn,
        numberPerson : data.numberPerson,
        note : data.note,
        image : data.image
    },{where : {id :data.id}});
    res.send({done : true});
});

router.get('/get/all/food',function (req, res, next) {
    Food.findAll().then((food)=>{
        if(!food){
            res.status(httpStatus.BAD_REQUEST).send({
            message: "Error",
          });
        }else{
            res.send(food);
        }
      });
});

router.get('/get/new/food',async function (req, res, next) {
    var newFood = [];
    await Food.findAll({
        order:[['updatedAt', 'DESC']],
    }).then((food)=>{
        if(!food){
            res.status(httpStatus.BAD_REQUEST).send({
            message: "Error",
          });
        }else{
            food.forEach(element => {
                if(newFood.length < 10){
                    newFood.push(element);
                }
            });
        }
      });
    res.send(newFood);
});

router.get('/get/type/:type/food',function (req, res, next) {
    var type = req.params.type ;
    Food.findAll({where : {typeFood : type}}).then((food)=>{
        if(!food){
            res.status(httpStatus.BAD_REQUEST).send({
            message: "Error",
          });
        }else{
            res.send(food);
        }
      });
});

router.get('/get/categorize/:id/food',function (req, res, next) {
    var id = req.params.id ;
    Food.findAll({where : {CategorizeId : id}}).then((food)=>{
        if(!food){
            res.status(httpStatus.BAD_REQUEST).send({
            message: "Error",
          });
        }else{
            res.send(food);
        }
      });
});

router.get('/get/season/:season/food',function (req, res, next) {
    var season = req.params.season ;
    Food.findAll({where : {season : season}}).then((food)=>{
        if(!food){
            res.status(httpStatus.BAD_REQUEST).send({
            message: "Error",
          });
        }else{
            res.send(food);
        }
      });
});

router.get('/get/one/food/id/:id',function (req, res, next) {
    var id = req.params.id ;
    Food.findOne({where : {id : id}}).then((food)=>{
        if(!food){
            res.status(httpStatus.BAD_REQUEST).send({
            message: "Error",
          });
        }else{
            res.send(food);
        }
      });
});

router.post('/get/one/food/name',function (req, res, next) {
    var name = req.body.name ;
    Food.findOne({where : {nameAr : name}}).then((food)=>{
        if(!food){
            res.status(httpStatus.BAD_REQUEST).send({
            message: "Error",
          });
        }else{
            res.send(food);
        }
      });
});

router.get('/get/health/component/food/:food',async function (req, res, next) {
    var foodId = req.params.food ;
 
    var allComponent = [];
 
    await RecordHealth.findAll({where : {FoodId : foodId}}).then((recordComponent)=>{
     if(!recordComponent){
         res.status(httpStatus.BAD_REQUEST).send({
             message: "Error",
           });
     }else{ 
         var i = 0 ;
         recordComponent.forEach(async record => {
 
             await Health.findOne({where : {id : record.HealthComponentId}}).then((component)=>{
                 if(!component){
                     res.status(httpStatus.BAD_REQUEST).send({
                         message: "Error",
                       });
                 }else{
                     i=i+1;
                     allComponent.push({
                         id : component.id ,
                         rate : record.rate ,
                         nameFoodComponent : component.nameHealthComponent ,
                        });
                        if(i == recordComponent.length){
                         res.send(allComponent);
                        }
                 }
             });
         });
     }
    });
 });

router.get('/get/component/food/:food',async function (req, res, next) {
   var foodId = req.params.food ;

   var allComponent = [];

   await RecordComponent.findAll({where : {FoodId : foodId}}).then((recordComponent)=>{
    if(!recordComponent){
        res.status(httpStatus.BAD_REQUEST).send({
            message: "Error",
          });
    }else{ 
        var i = 0 ;
        recordComponent.forEach(async record => {

            await Component.findOne({where : {id : record.FoodComponentId}}).then((component)=>{
                if(!component){
                    res.status(httpStatus.BAD_REQUEST).send({
                        message: "Error",
                      });
                }else{
                    i=i+1;
                    allComponent.push({
                        id : component.id ,
                        typeAmount : record.typeAmount ,
                        amount : record.amount ,
                        image : component.image,
                        nameFoodComponent : component.nameFoodComponent ,
                       });
                       if(i == recordComponent.length){
                        res.send(allComponent);
                       }
                }
            });
        });
    }
   });
});

router.get('/shared/with/me/:me/other/:other', async function(req, res, next) {
    var idFood=[];
    var meRate=[];
    var id1 = req.params.me;
    var id2 = req.params.other;
    await Rate.findAll({where : {AccountId : id1}}).then((rate)=>{
        if(!rate){
            res.status(httpStatus.BAD_REQUEST).send({
            message: "Error",
          });
        }else{
            rate.forEach(element => {
                meRate.push(element.FoodId);
            });
        }
      });

    await Rate.findAll({where : {AccountId : id2}}).then((rate)=>{
        if(!rate){
            res.status(httpStatus.BAD_REQUEST).send({
            message: "Error",
          });
        }else{
            rate.forEach(element => {
                if(meRate.includes(element.FoodId)){
                    idFood.push(element.FoodId);
                }
            });
        }
      });

  res.send(idFood);
});

module.exports = router;
