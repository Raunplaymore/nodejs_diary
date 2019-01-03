var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public'))); //지정된 정적 루트로 접근 가능하게 함
app.use(express.json()); //body-parser가 일부 imbeded 됨
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret code'));
app.user(session({
  resave: false, // 요청시 수정사항이 없더라도 세션을 저장할지 여부
  saveUninitialized: false, // 세션에 저장할 내역 없을 때 저장 여부 (tracking에 많이 이용됨)
  secret: 'secret code',
  cookie: {
    httpOnly: true, //client가 쿠키를 확인 못하도록 함
    secure: false //https 환경 접속 여부
  }
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
