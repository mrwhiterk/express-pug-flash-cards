const express = require('express');
const router = express.Router();

/**
 * middleware
 */

 // note: you can pass multiple function to one app.use
router.use((req, res, next) => {
  // console.log('hello');
  // creating a custom error and passing it to next will stop the program and throw error on stack trace
  const err = new Error('Oh noes!');
  err.status = 500;
  next();
});

router.use((req, res, next) => {
  // console.log('world');
  next();
});

router.get('/', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render('index', { name });
  } else {
    res.redirect('/hello');
  }
});

router.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

router.post('/hello', (req, res) => {
  // cookie is used to set 'memory' between browser and server. After I set this cookie it will be sent to my server on all future request.

  // note: cookies are stored in plain text - don't store sensitive data
  res.cookie('username', req.body.username);
  res.redirect('/');
});

router.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
});

module.exports = router;