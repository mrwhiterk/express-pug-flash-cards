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

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes)
app.use('/cards', cardRoutes);


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
