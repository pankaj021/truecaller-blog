const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const blogRouter = require('./routes/blog');

const NODE_PATH = process.cwd();

const app = express();

app.set('views', path.join(NODE_PATH, '/ui/templates'));
app.set('view engine', 'pug');
app.use(favicon(path.join(NODE_PATH, 'public', 'icons/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(NODE_PATH, 'public')));

app.use('/', index);
app.use('/blogs', blogRouter);

app.get(['/blog/*', '/tag/*', '/category/*'], (req, res) => {
  res.render('index');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.log("Deafult Error handler: ", err);

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req
    .app
    .get('env') === 'development'
    ? err
    : {};
  // render the error page
  res.status(err.status || 500);
  res.render('index');
});

module.exports = app;
