const express = require('express');
const router = express.Router();
const logger = require('../lib/logger');
const const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const departmentService = require('../service/departmentService');
const { isLoggedIn } = require('../lib/middleware');

// 등록
router.post('/', isLoggedIn, async (req, res) => {
  try {
    const params = {
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
    };
    logger.info(`(department.reg.params) ${JSON.stringify(params)}`);

    // 필수값 체크
    if (!params.name) {
      const err = new Error('Not allowed null (name)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }
    // if (!params.code) {
    //   const err = new Error('Not allowed null (code)');
    //   logger.error(err.toString());

    //   res.status(500).json({ err: err.toString() });
    // }

    // 비즈니스 로직 호출
    const result = await departmentService.reg(params);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 리스트 검색
router.get('/', async (req, res) => {
  try {
    const params = {
      id: req.query.id ? req.query.id.split(',') : null,
      name: req.query.name,
    };
    logger.info(`(department.list.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await departmentService.list(params);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 상세정보
router.get('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(department.info.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await departmentService.info(params);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 부서 수정
router.put('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
    };
    logger.info(`(department.edit.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await departmentService.edit(params);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 부서 삭제
router.delete('/:id', async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(department.delete.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await departmentService.delete(params);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});
module.exports = router;
