const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      boardId: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
      },
      imagePath: {
        type: Sequelize.STRING(255),
      },
      filePath: {
        type: Sequelize.STRING(255),
      },
      viewCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
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
    db.Post.hasMany(db.Comment, {
      foreignKey: {
        name: 'postId',
        onDelete: 'SET NULL',
        as: 'Comment',
      },
    });
  }
  static includeAttributes = ['id',, 'title', 'userId', 'createdAt'];
};
