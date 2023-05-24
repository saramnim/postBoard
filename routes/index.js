const express = require('express');
const boardRouter = require('./board');
const userRouter = require('./users');
const commentRouter = require('./comment');
const postRouter = require('./post');
const departmentRouter = require('./department');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
