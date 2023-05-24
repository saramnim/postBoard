const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userId: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    }, {
      sequelize,
      underscored: true,
      timestamps: true,
      paranoid: true,
    });
  }

  static associate(db) {
    db.Board.hasMany(db.Post, {
      foreignKey: {
        name: 'boardId',
        onDelete: 'SET NULL',
        as: 'Post',
      },
    });
    db.Board.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        onDelete: 'SET NULL',
        as: 'User',
      },
    });
  }
  static includeAttributes = ['id', 'title', 'active', 'createdAt'];
};
