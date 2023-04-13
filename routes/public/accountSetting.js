var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
var rand,host,link;  
var Valid_Model = require("../../models/Valid_Model")  

router.post('/send/email', async (req, res) => {
    var text='Welcome To YallaEat !';
    var subject='Have a nice experience in YallaEat App !'
    rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    const data = req.body;
    var userEmail=data.email;
    link="http://"+req.get('host')+"/valid/"+`${rand}`+"/email/"+`${userEmail}`+"/verify/email";
    console.log(link);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {user: '', pass: ''}
        });
        await transporter.sendMail({
            from: 'YallaEat',
            to: userEmail,
            subject,
            text,
            html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
             },function(error,response){
            if(error){
                console.log(error.message);
                console.log(`Not Send Mail with subject: ${subject}\nand text: ${text}\nwasn\'t sent.`);
                res.end("error");
            }else{
                console.log("Message sent: " + response.message);
                console.log(`Send Mail with subject: ${subject}\nand text: ${text}\n.`);
                res.end("sent");
            }
        });
});

router.get('/:rank/email/:email/verify/email',function(req,res){
    console.log(req.protocol+":/"+req.get('host'));
    console.log("fdssdfsdfsfd :     "+req.params.rank);
    console.log("fdssdfsdfsfd :     "+req.params.email);
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.params.rank==rand)
        {
            Valid_Model.create({email : req.params.email,});
            console.log("email is verified");
            res.end("Successfully verified");
        }
        else
        {
            console.log("Not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else
    {
        res.end("Unknown Source");
    }
    });

router.get('/email/:email/done/verify',function(req,res){
    console.log("fdssdfsdfsfd :     "+req.params.email);
    var email = req.params.email;
    Valid_Model.findOne({where : {email : email}}).then((validResult)=>{
        if(!validResult){
            res.send({done : false});
        }else{
            Valid_Model.destroy({where : {email : email}});
            res.send({done : true});
        }
    });
    // Valid_Model.count({ where: { email: req.params.email} })
    //   .then(count => {
    //     if (count != 0) {
    //       done= false;
    //       console.log("fdssdfsdfsfd :     "+false);
    //     }
    //     done= true;
    // });
});

module.exports = router;
