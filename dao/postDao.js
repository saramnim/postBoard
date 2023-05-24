const { Op } = require('sequelize');
const {
  User, Board, Post, Department, Comment,
} = require('../models/index');

const dao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      User.create(params)
        .then((inserted) => {
          resolve(inserted);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  selectList(params) {
    // where 검색 조건
    const setQuery = {};
    if (params.title) {
      setQuery.where = {
        ...setQuery.where,
        title: { [Op.like]: `%${params.title}%` }, // like검색
      };
    }
    if (params.content) {
      setQuery.where = {
        ...setQuery.where,
        content: { [Op.like]: `%${params.content}%` }, // like검색
      };
    }
    if (params.userIds) {
      setQuery.where = {
        ...setQuery.where,
        userId: params.userIds, // in 검색
      };
    }
    setQuery.order = [['id', 'DESC']];
    return new Promise((resolve, reject) => {
      Post.findAndCountAll({
        ...setQuery,
        include: [{
          model: User,
          as: 'User',
          attributes: User.includeAttributes,
        }],
      })
        .then((selectedList) => {
          resolve(selectedList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      Post.findByPk(params.id, {
        include: [{
          model: Board,
          as: 'Board',
          attributes: Board.includeAttributes,
        }, {
          model: Comment,
          as: 'Comment',
          attributes: Comment.includeAttributes,
        }, {
          model: User,
          as: 'User',
          attributes: User.includeAttributes,
          include: [{
            model: Department,
            as: 'Department',
            attributes: Department.includeAttributes,
          }],
        },
        ],
      }).then((selectedInfo) => {
        resolve(selectedInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  update(params) {
    return new Promise((resolve, reject) => {
      Post.update(params, {
        where: { id: params.id },
      })
        .then(([updated]) => {
          resolve({ updatedCount: updated });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  delete(params) {
    return new Promise((resolve, reject) => {
      Post.destroy({
        where: { id: params.id },
      })
        .then((deleted) => {
          resolve({ deletedCount: deleted });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = dao;
