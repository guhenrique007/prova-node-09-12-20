'use strict';

const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
  return jwt.sign(data, process.env.SALT_TOKEN, { expiresIn: '1d' });
};

exports.decodeToken = async (token) => {
  var data = await jwt.verify(token, process.env.SALT_TOKEN);
  return data;
};

exports.authorize = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    res.status(401).json({
      message: 'Restrict Access',
      status: 401,
      body: token,
    });
  }

  jwt.verify(token, process.env.SALT_TOKEN, function (error, decoded) {
    if (error) {
      res.status(401).json({
        message: 'Invalid Token',
        status: 401,
        body: token,
      });
    } else {
      next();
    }
  });
};
