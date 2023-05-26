const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const weatherUtil = require('../lib/weatherUtil');
const { isLoggedIn } = require('../lib/middleware');

// 등록
router.post('/', isLoggedIn, async (req, res) => {
  try {
    const params = {
      numOfRows: req.body.numOfRows,
      pageNo: req.body.pageNo,
      dataType: req.body.dataType,
      base_date: req.body.base_date,
      base_time: req.body.base_time,
      nx: req.body.nx,
      ny: req.body.ny,
    };
    logger.info(`(weather.reg.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await weatherUtil.getData(params);
    logger.info(`(weather.reg.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
