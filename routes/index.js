const express = require('express');
const logger = require('../lib/logger');
const departmentRouter = require('./department');
const userRouter = require('./user');
const authRouter = require('./auth');
const boardRouter = require('./board');
const postRouter = require('./post');
const uploadRouter = require('./upload');
const weatherRouter = require('./weather');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/log-test', (req, res, next) => {
  logger.error('This message is error');
  logger.warn('This message is warn');
  logger.info('This message is info');
  logger.verbose('This message is verbose');
  logger.debug('This message is debug');
  logger.silly('This message is silly');

  res.send('log test');
});

router.use('/departments', departmentRouter);
router.use('/users', userRouter);
router.use('/auths', authRouter);
router.use('/boards', boardRouter);
router.use('/posts', postRouter);
router.use('/uploads', uploadRouter);
router.use('/weather', weatherRouter);

module.exports = router;
