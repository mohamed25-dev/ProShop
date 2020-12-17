const bcrypt = require('bcryptjs');
const { getId } = require('../../common/idGenerator');
const { generateAuthToken } = require('../../common/token');
const {
  NotFoundException,
  BadRequestException,
  UnauthenticatedException,
} = require('../../common/errors/exceptions');
const userDao = require('../dao/user');
const orderDao = require('../dao/order');

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

  user.token = generateAuthToken(user);
  delete user.password;

  return user;
};

exports.getUserByEmail = async (userEmail) => {
  let user = await userDao.getUserByEmail(userEmail);
  delete user.password;

  return user;
};

exports.createUser = async (user) => {
  let userExist = await userDao.getUserByEmail(user.email);
  if (userExist) {
    throw new BadRequestException('User with the same email already exist');
  }

  let id = getId();

  user.id = id;
  user.roleId = 1;
  user.password = await bcrypt.hash(user.password, 8);

  await userDao.createUser(user);

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
  user.mobileNumber = updateUser.mobileNumber || user.mobileNumber;
  user.roleId = updateUser.roleId || user.roleId;

  if (updateUser.password) {
    user.password = await bcrypt.hash(updateUser.password, 8);
  }

  await userDao.updateUser(user);

  user = await userDao.getUserById(userId);
  delete user.password;
  return user;
};

exports.deleteUser = async (userId) => {
  const user = await userDao.getUserById(userId);
  if (!user) {
    throw new NotFoundException('User not found');
  }

  const orders = await orderDao.getOrdersByUserId(userId);
  if (orders.length > 0) {
    throw new BadRequestException("User has orders and can't be deleted");
  }

  return userDao.deleteUser(userId);
};
