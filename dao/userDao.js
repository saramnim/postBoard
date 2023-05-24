const { Op } = require('sequelize');
const { User, Department } = require('../models/index');

const dao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      User.create(params)
        .then((inserted) => {
          const insertedResult = { ...inserted };
          delete insertedResult.dataValues.password;
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
    if (params.name) {
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.like]: `%${params.name}%` }, // like검색
      };
    }
    if (params.userId) {
      setQuery.where = {
        ...setQuery.where,
        userId: params.userId, // like검색
      };
    }
    setQuery.order = [['id', 'DESC']];
    return new Promise((resolve, reject) => {
      User.findAndCountAll({
        ...setQuery,
        attributes: { exclude: ['password'] },
        include: [{
          model: Department,
          as: 'Department',
        },
        ],
      })
        .then((selectedList) => {
          resolve(selectedList);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // selectInfo(params) {
  //   return new Promise((resolve, reject) => {
  //     // Department.findAll
  //     User.findByPk(params.id, {
  //       include: [
  //         {
  //           model: Department,
  //           as: 'Department',
  //         },
  //       ],
  //     })
  //       .then((selectedInfo) => {
  //         resolve(selectedInfo);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // },
  // update(params) {
  //   return new Promise((resolve, reject) => {
  //     // User.findAll
  //     User.update(params, {
  //       where: { id: params.id },
  //     })
  //       .then(([updated]) => {
  //         resolve({ updatedCount: updated });
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // },
  // delete(params) {
  //   return new Promise((resolve, reject) => {
  //     // User.findAll
  //     User.destroy({
  //       where: { id: params.id },
  //     })
  //       .then((deleted) => {
  //         resolve({ deletedCount: deleted });
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // },
  selectUser(params) {
    return new Promise((resolve, reject) => {
      User.findOne({
        attributes: ['id', 'userId', 'password', 'name', 'role'],
        where: { userId: params.userId },
      }).then((selectedOne) => {
        resolve(selectedOne);
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = dao;
