const db = require('../models');
const User = db.user;

exports.getAllUsers = async () => {
  let result = await User.findAll();

  result = result.map((row) => row.toJSON());
  return Promise.resolve(result);
};

exports.getUserById = async (userId) => {
  let result = await User.findByPk(userId);
  return Promise.resolve(result === null ? null : result.toJSON());
};

exports.getUserByEmail = async (userEmail) => {
  const result = await User.findOne({
    where: {
      email: userEmail,
    },
  });

  return Promise.resolve(result === null ? null : result.toJSON());
};

exports.createUser = async (user) => {
  const result = await User.create({
    ...user,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return Promise.resolve(result === null ? null : result.toJSON());
};

exports.updateUser = (user) => {
  return User.update(
    {
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      where: {
        id: user.id,
      },
    }
  );
};
