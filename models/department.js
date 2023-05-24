const Sequelize = require('sequelize');

module.exports = class Department extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(50),
        unique: 'department_unique',
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
    }, {
      sequelize,
      underscored: true,
      timestamps: true,
      paranoid: true,
    });
  }

  static associate(db) {
    db.Department.hasMany(db.User, {
      foreignKey: { name: 'departmentId' },
      onDelete: 'SET NULL',
      as: 'User',
    });
  }

  static includeAttributes = ['id', 'name', 'createdAt'];
};
