var express = require('express');
var router = express.Router();
var Categorize = require("../models/Categorize");
var Food =require("../models/Food");

/* GET home page. */
router.get('/all/categorize', function(req, res, next) {
  Categorize.findAll().then((categorize)=>{
    if(!categorize){
        res.status(httpStatus.BAD_REQUEST).send({
            message: "No Ratting Founded",
          });
    }else{
        res.send(categorize);
    }
  });
});

router.get('/one/categorize/id/:id', function(req, res, next) {
    var id = req.params.id ;
    Categorize.findOne({where : {id : id}}).then((categorize)=>{
      if(!categorize){
          res.status(httpStatus.BAD_REQUEST).send({
              message: "No Ratting Founded",
            });
      }else{
          res.send(categorize);
      }
    });
  });

router.post('/add/categorize',function (req, res, next) {
  var data = req.body ;
  Categorize.create({
    nameAr : data.nameAr,
    nameEn : data.nameEn,
    image : data.image
  });
  res.send({done : true});
});

router.post('/update/categorize',function (req, res, next) {
  var data = req.body ;
  Categorize.update({
    nameAr : data.nameAr,
    nameEn : data.nameEn,
    image : data.image
  },{where : {id : data.id}});
  res.send({done : true});
});

router.post('/drop/categorize',async function (req, res, next) {
  await Food.findAll({where : {CategorizeId : req.body.id}}).then((food)=>{
    food.forEach(async elementFood => {
      await RecordComponent.findAll({where : {FoodId : elementFood.id}}).then((component) => {
        component.forEach(element => {
            Component.destroy({where : {id : element.FoodComponentId}});
            RecordComponent.destroy({where : {FoodId : elementFood.id}});
        });
    });

    await RecordHealth.findAll({where : {FoodId : elementFood.id}}).then((component) => {
        component.forEach(element => {
            Health.destroy({where : {id : element.HealthComponentId}});
            RecordHealth.destroy({where : {FoodId : elementFood.id}});
        });
    });

    await Food.destroy({where : {id : elementFood.id}});
    });
  });
  await Categorize.destroy({where : {id: req.body.id}});
  res.send({done : true});
});

module.exports = router;
