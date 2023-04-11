var express = require('express');
var router = express.Router();
var Note = require("../models/Note");

/* GET home page. */
router.get('/all/note/account/:id', function(req, res, next) {
    var id = req.params.id;
  Note.findAll({where : {AccountId : id}}).then((note)=>{
    if(!note){
        res.status(httpStatus.BAD_REQUEST).send({
            message: "No Ratting Founded",
          });
    }else{
        res.send(note);
    }
  });
});

router.get('/one/note/id/:id', function(req, res, next) {
    var id = req.params.id ;
    Note.findOne({where : {id : id}}).then((note)=>{
      if(!note){
          res.status(httpStatus.BAD_REQUEST).send({
              message: "No Ratting Founded",
            });
      }else{
          res.send(note);
      }
    });
});

router.post('/add/note',function (req , res, next) {
   var data = req.body ;
   Note.create({
    title : data.title,
    content : data.content,
    AccountId : data.AccountId
   }); 
   res.send({done : true});
});

router.post('/update/note',function (req , res, next) {
    var data = req.body ;
    Note.update({
     title : data.title,
     content : data.content,
     AccountId : data.AccountId
    },
    {where : {id : data.id}}); 
    res.send({done : true});
 });

router.post('/drop/note',function(req, res, next){
    var data = req.body ;
    Note.destroy({ where: { id: data.idNote } });
    res.send({done : true});
});

module.exports = router;
