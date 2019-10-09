const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));

// middleware
app.use(cookieParser());

// only run middleware on /users route
// app.get('/users', (req, res, next) => {})

app.set('view engine', 'pug');

// note: you can pass multiple function to one app.use

/**
 * middleware
 */
app.use((req, res, next) => {
  console.log('hello');
  // creating a custom error and passing it to next will stop the program and throw error on stack trace
  const err = new Error('Oh noes!');
  err.status = 500;
  next();
});

app.use((req, res, next) => {
  console.log('world');
  next();
});

app.get('/', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render('index', { name });
  } else {
    res.redirect('/hello');
  }
});

app.get('/cards', (req, res) => {
  res.render('card', {
    prompt: "Who is buried in Grant's tomb?",
    hint: 'Think about whose tomb it is.'
  });
});

app.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

app.post('/hello', (req, res) => {
  // cookie is used to set 'memory' between browser and server. After I set this cookie it will be sent to my server on all future request.

  // note: cookies are stored in plain text - don't store sensitive data
  res.cookie('username', req.body.username);
  res.redirect('/');
});

app.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
});

// if express gets this far that means not routes match and we should return 404.
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// this will catch any error that is passed to a next function, and give a templated display.
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error', err);
});

app.listen(3000, () => console.log('✅ : 3000'));
