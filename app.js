var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config-lite')(__dirname);
var pkg = require('./package');

var router = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));// 设置模板目录，__dirname是node.js里面的全局变量，即取得执行的js所在的路径
app.set('view engine', 'ejs');// 设置模板引擎为 ejs

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));//可以将请求信息打印在控制台，便于开发调试

// 将client提交过来的post请求放入request.body中
app.use(bodyParser.json());// 解析 application/json
app.use(bodyParser.urlencoded({ extended: false }));// 解析 application/x-www-form-urlencoded

app.use(cookieParser());//req.cookies，每一个cookie为cookies属性值数组中的一个对象.
app.use(express.static(path.join(__dirname, 'public')));// 设置静态文件目录


//设置跨域访问
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

// 设置模板全局常量
app.locals.proInfo = {
  title:pkg.name
}

router(app);

// catch 404 and forward to error handler  把该中间件放到路由最后，在所有的都不匹配时采用这个函数
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
