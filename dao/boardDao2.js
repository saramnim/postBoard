const { Op } = require('sequelize');
const { Board, User, Post } = require('../models/index');

const dao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      Board.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  selectList(params) {
    const setQuery = {};
    if (params.title) {
      setQuery.where = {
        ...setQuery.where,
        title: { [Op.like]: `%${params.title}%` },
      };
    }
    if (params.active) {
      setQuery.where = {
        ...setQuery.where,
        active: params.active,
      };
    }
    if (params.userIds) {
      setQuery.where = {
        ...setQuery.where,
        userIds: params.userIds,
      };
    }
    setQuery.order = [['id', 'DESC']];
    return new Promise((resolve, reject) => {
      Board.findAndCountAll({
        ...setQuery,
        include: [
          {
            model: User,
            attributes: User.includeAttributes,
          }],
      }).then((selectedList) => {
        resolve(selectedList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      Board.findByPk(
        params.id,
        {
          include: [{
            model: Post,
            as: 'Post',
            attributes: Post.includeAttributes,
            include: [{
              model: User,
              as: 'User',
              attributes: User.includeAttributes,
            }],
          }, {
            model: User,
            as: 'User',
            attributes: User.includeAttributes,
          },
          ],
        },
      ).then((selectedInfo) => {
        resolve(selectedInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  update(params) {
    return new Promise((resolve, reject) => {
      Board.update(
        params,
        {
          where: { id: params.id },
        },
      ).then(([updated]) => {
        resolve({ updatedCount: updated });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  delete(params) {
    return new Promise((resolve, reject) => {
      Board.destroy({
        where: { id: params.id },
      }).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = dao;
