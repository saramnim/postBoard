const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
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
    db.Comment.belongsTo(db.Post, {
      foreignKey: {
        name: 'postId',
        onDelete: 'SET NULL',
        as: 'Post',
      },
    });
    db.Comment.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        onDelete: 'SET NULL',
        as: 'User',
      },
    });
  }
};
