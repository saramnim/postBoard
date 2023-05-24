// const params = {
//   title: req.body.title,
//   active: req.body.active || true,
//   userId: loginuserId,
// };

const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const boardService = require('../service/boardService');
const { isLoggedIn } = require('../lib/middleware');

// 등록
router.post('/', isLoggedIn, async (req, res) => {
  const loginUserId = res.get('userId' || null);
  try {
    const params = {
      title: req.body.title,
      active: req.body.active,
      userId: loginUserId,
    };
    logger.info(`(board.reg.params) ${JSON.stringify(params)}`);

    // 필수값 체크
    if (!params.title) {
      const err = new Error('Not allowed null (title)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }
    // if (!params.active) {
    //   const err = new Error('Not allowed null (active)');
    //   logger.error(err.toString());

    //   res.status(500).json({ err: err.toString() });
    // }

    // 비즈니스 로직 호출
    const result = await boardService.reg(params);

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
      title: req.query.title,
    };
    logger.info(`(board.list.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await boardService.list(params);

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
    logger.info(`(board.info.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await boardService.info(params);

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
      title: req.body.title,
      active: req.body.active,
    };
    logger.info(`(board.edit.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await boardService.edit(params);

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
    logger.info(`(board.delete.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await boardService.delete(params);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});
module.exports = router;
