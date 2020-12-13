const faker = require('faker');
const { factory } = require("factory-girl");
const User = require('../models/User').definition;

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
});

module.exports = factory;
 