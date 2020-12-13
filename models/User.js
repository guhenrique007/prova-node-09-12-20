const Sequelize = require('sequelize');

const fields = {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
};

const params = {
  freezeTableName: true,
};

module.exports.base = (sequelize, DataTypes) => {
  let user = sequelize.define('users', fields, params);

  return user;
};

module.exports.definition = global.sequelize.define('users', fields, params);
