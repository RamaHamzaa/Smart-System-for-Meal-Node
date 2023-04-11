var express = require('express');
var router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'upload_file/Images');
  },
//   destination: "images",
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = '';
    if(file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if(file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if(file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'file-' + file.originalname + '-' + Date.now() + '.' + filetype);
  }
});

const upload = multer({storage : storage}).single('image');

router.post('/upload/image', upload, function(req, res, next) {
  console.log(req.file.originalname);
    if (!req.file) {
        console.log("No image received");
        return res.send({
          success: false
        });
      } else {
        console.log('image received');
        linkImage = req.protocol+"://"+req.get('host')+'/get/image/'+req.file.filename;
        return res.send({
          link: linkImage
        });
      }
});

module.exports = router;
