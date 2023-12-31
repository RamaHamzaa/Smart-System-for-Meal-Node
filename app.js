var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
const database = require('./database/index');

var indexRouter = require('./routes/index');
var usersRouter = require("./auth/router");
var infoUserRouter = require("./routes/users")
var imageLoader = require("./upload_file/image");
var validRouter = require("./routes/public/accountSetting");
var FoodRouter = require("./routes/food");
var CategorizeRouter = require("./routes/categorize")
var NoteRouter = require("./routes/note");

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/valid', validRouter);
app.use('/users', usersRouter);
app.use('/file',imageLoader);
app.use('/info/user',infoUserRouter);
app.use('/food',FoodRouter);
app.use('/categorize',CategorizeRouter);
app.use('/note',NoteRouter);
app.use('/get/image/',express.static('./upload_file/Images'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Sequelize
var Init = require("./models/Init")


const port = process.env.PORT || 8000;

const runServer = async () => {
  try {
    await database.authenticate();
    console.log("Connection has been established successfully.");
    database
      //.sync({ force: true })
      //.sync({ alter: true })
      .sync()
      .then((result) => {
       // app.listen(port, () => console.log(`Server is up at port: ${port}`));
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

runServer();

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
