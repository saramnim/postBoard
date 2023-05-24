const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      depatment_id: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
      },
      userid: {
        type: Sequelize.STRING(255),
      },
      password: {
        type: Sequelize.STRING(500),
      },
      role: {
        type: Sequelize.STRING(20),
      },
      email: {
        type: Sequelize.STRING(20),
      },
      phone: {
        type: Sequelize.STRING(255),
      },
      updated_pw_date: {
        type: Sequelize.DATE,
      },
    }, {
      sequelize,
      underscored: true,
      timestamps: true,
      paranoid: true,
    });
  }

  static associate(db) {
    db.User.belongsTo(db.Department, {
      foreignKey: {
        name: 'departmentId',
        onDelete: 'SET NULL',
        as: 'Department',
      },
    });
  }
};
