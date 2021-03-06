'use strict';

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model { }
  User.init({
    'id': {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    'avatar': DataTypes.STRING,
    'name': DataTypes.STRING,
    'email': DataTypes.STRING,
    'password': DataTypes.STRING,
  }, {
    sequelize,
    tableName: `users`,
    timestamps: false
  });

  return User;
};
