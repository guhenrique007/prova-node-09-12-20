const User = require('../../models/User').definition;


exports.get = async () => {
  const res = await User.findAll({
  });
  return res;
};

exports.getById = async (id) => {
  const res = await User.findOne({
    where: { id },
  });

  return res;
};

exports.getByEmail = async (email) => {
    console.log(User)
  const res = await User.findOne({ where: { email } });
  return res;
};

exports.getByName = async (name) => {
  const res = await User.findOne({ where: { name } });
  return res;
};

exports.getByUserName = async (username) => {
  const res = await User.findOne({ where: { username } });
  return res;
};

exports.create = async (data) => {
  const res = await User.create(data);
  return res;
};

exports.delete = async (id) => {
  const res = await User.destroy({ where: { id } });
  return res;
};

exports.login = async (data) => {
  const { username, email } = data;

  const res = await User.findOne({
    where: { username, email },
  });
  return res;
}
