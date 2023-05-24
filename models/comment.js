const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      boardId: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      content: {
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
    db.Post.belongsTo(db.Board, {
      foreignKey: {
        name: 'boardId',
        onDelete: 'SET NULL',
        as: 'Board',
      },
    });
    db.Post.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        onDelete: 'SET NULL',
        as: 'User',
      },
    });
  }
};
