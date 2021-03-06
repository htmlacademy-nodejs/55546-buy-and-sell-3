'use strict';

module.exports = (sequelize, DataTypes) => {
  class Comment extends sequelize.Sequelize.Model { }
  Comment.init({
    'id': {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    'author_id': DataTypes.INTEGER,
    'offer_id': DataTypes.INTEGER,
    'text': DataTypes.STRING,
    'date_create': DataTypes.DATE,
  }, {
    sequelize,
    tableName: `comments`,
    timestamps: false
  });

  return Comment;
};
