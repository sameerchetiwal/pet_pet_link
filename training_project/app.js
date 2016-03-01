var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/post_route');

var app = express();

var multer=require('multer');
var storage=multer.diskStorage({

  destination: function(req,file,cb){
    cb(null, __dirname+ '/front-end/uploads')
  },
  filename: function(req,file,cb){
    cb(null, file.originalname)
  }
});
var upload=multer({storage:storage});

app.post('/upload/url',upload.single('file'),function(req,res,next){
  console.log("hello")
  var path='/uploads/'+req.file.originalname;
  res.send(path);
});

var passport=require('passport');
var passport_config=require('./passport/passport_configure');
var session=require('express-session');

// app.use(express.session({ secret: 'key' }));
//   app.use(passport.initialize());
//   app.use(passport.session());

app.use(session({ secret: 'key' }));
app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'front-end')));

app.use('/',routes);
app.use('/users',users);
app.use('/posts',posts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//sameer


module.exports = app;
