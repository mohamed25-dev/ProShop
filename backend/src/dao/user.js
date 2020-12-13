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
  console.log('Dao');

  let result = await User.findOne({
    where: {
      email: userEmail,
    },
  });

  console.log(result.toJSON());
  return Promise.resolve(result === null ? null : result.toJSON());
};

exports.createUser = (user) => {
  return User.create({
    ...user,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
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
