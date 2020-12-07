var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 路由
var staffRouter = require('./routes/staff');
var deptRouter = require('./routes/dept');
var customerRouter = require('./routes/customer');
var submitperson = require('./routes/submitperson');
var ordertype = require('./routes/ordertype');
var order = require('./routes/order');
var sysconfig = require('./routes/sysconfig');
const cors = require("cors");
var bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));//固定写法
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由注册
app.use('/staff', staffRouter);
app.use('/dept', deptRouter);
app.use('/customer', customerRouter);
app.use('/ordertype', ordertype);
app.use('/order', order);
app.use('/sysconfig', sysconfig);
app.use('/submitperson', submitperson);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
//全局处理错误
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
