const bcrypt = require('bcryptjs');
const { getId } = require('../../common/idGenerator');
const { generateAuthToken } = require('../../common/token');
const {
  NotFoundException,
  BadRequestException,
  UnauthenticatedException,
} = require('../../common/errors/exceptions');

const userDao = require('../dao/user');

exports.getAllUsers = () => {
  return userDao.getAllUsers();
};

exports.getUserById = (userId) => {
  return userDao.getUserById(userId);
};

exports.loginUser = async (email, password) => {
  let user = await userDao.getUserByEmail(email);
  if (!user) {
    return;
  }

  let isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    return;
  }

  delete user.password;

  user.token = generateAuthToken(user);

  return user;
};

exports.getUserByEmail = (userEmail) => {
  return userDao.getUserByEmail(userEmail);
};

exports.createUser = async (user) => {
  let userExist = await userDao.getUserByEmail(user.email);
  if (userExist) {
    throw new BadRequestException('User with the same email already exist');
  }

  let id = getId();

  user.id = id;
  user.role_id = 1;
  user.password = await bcrypt.hash(user.password, 8);

  await userDao.createUser(user);

  delete user.password;
  return user;
};

exports.updateUser = async (userId, updateUser) => {
  let user = await userDao.getUserById(userId);
  if (!user) {
    throw new NotFoundException('User Not Found');
  }

  if (updateUser.email) {
    let userExist = await userDao.getUserByEmail(updateUser.email);
    if (userExist && userExist.id !== userId) {
      throw new BadRequestException('User with the same email exist');
    }
    user.email = updateUser.email;
  }

  user.name = updateUser.name || user.name;
  user.mobile_number = updateUser.mobile_number || user.mobile_number;

  if (updateUser.password) {
    user.password = await bcrypt.hash(updateUser.password, 8);
  }

  await userDao.updateUser(user);

  delete user.password;
  return user;
};
