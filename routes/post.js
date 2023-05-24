// const params = {
//   title: req.body.title,
//   active: req.body.active || true,
//   userId: loginuserId,
// };

const express = require('express');

const router = express.Router();
const logger = require('../lib/logger');
const postService = require('../service/postService');
const { isLoggedIn } = require('../lib/middleware');

// 등록
router.post('/', isLoggedIn, async (req, res) => {
  const loginUserId = res.get('userId' || null);
  try {
    const params = {
      boardId: req.body.boardId,
      title: req.body.title,
      content: req.body.content,
      imagePath: req.body.imagePath,
      filePath: req.body.filePath,
      userId: loginUserId,
    };
    logger.info(`(post.reg.params) ${JSON.stringify(params)}`);

    // 필수값 체크
    if (!params.boardId || !params.title) {
      const err = new Error('Not allowed null (boardId, title)');
      logger.error(err.toString());

      res.status(500).json({ err: err.toString() });
    }

    // 비즈니스 로직 호출
    const result = await postService.reg(params);

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
      title: req.query.title,

      title: req.query.title,
    };
    logger.info(`(post.list.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await postService.list(params);

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
      title: req.params.title,
      content: req.params.content,
      imagePath: req.params.imagePath,
      filePath: req.params.filePath,
    };
    logger.info(`(post.info.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await postService.info(params);

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
    logger.info(`(post.edit.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await postService.edit(params);

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
    logger.info(`(post.delete.params) ${JSON.stringify(params)}`);

    // 비즈니스 로직 호출
    const result = await postService.delete(params);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});
module.exports = router;
