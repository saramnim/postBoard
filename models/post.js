const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      boardId: {
        type: Sequelize.INTEGER,
      },
      userid: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(255),
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
        name: 'userid',
        onDelete: 'SET NULL',
        as: 'User',
      },
    });
  }
};
