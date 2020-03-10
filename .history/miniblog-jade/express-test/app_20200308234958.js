var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var editRouter = require('./routes/edit');
// 将express()框架赋给app变量
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 可拦截所有请求app.use（）中的是中间件 
// 中间件中无next则匹配路由后不往下执行；中间件中有next则匹配路由后往下执行；
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use()
app.use('/edit',function(req, res, next){
  userName=req.cookies.name;
  console.log("userName:",userName&&userName.length>0);
  if(userName&&userName.length>0){
    next();
    return;
  }
  var backUrl=req.originalUrl;
  res.render()
  //res.redirect("/login",{backUrl});
  //res.json("没有登录信息");
  
})
app.use('/edit', editRouter);
app.use('/users', usersRouter);
// app.use('/list', indexRouter);//和indexRouter中的路由路径进行拼接，父路径
// app.use('/detail', indexRouter);
// app.use('/login', indexRouter);
// app.use('/edit', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
