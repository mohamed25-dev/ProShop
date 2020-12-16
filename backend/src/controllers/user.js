const {
  NotFoundException,
  BadRequestException,
  UnauthenticatedException,
} = require('../../common/errors/exceptions');
const userService = require('../services/user');
const responseWrapper = require('../../common/response/success');

exports.getAllUsers = async (req, res) => {
  let users = await userService.getAllUsers();
  return responseWrapper.success(res, users);
};

exports.getUserById = async (req, res) => {
  let userId = req.params.id;
  let user = await userService.getUserById(userId);

  if (!user) {
    throw new UnauthenticatedException('email or password is not correct');
  }

  return responseWrapper.success(res, user);
};

exports.createUser = async (req, res) => {
  //TODO: validate request body
  let user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    roleId: req.body.roleId,
    mobileNumber: req.body.mobileNumber,
    profileImage: req.body.profileImage,
  };

  user = await userService.createUser(user);

  return responseWrapper.success(res, user);
};

exports.loginUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let user = await userService.loginUser(email, password);

  if (!user) {
    throw new UnauthenticatedException('Email or Password is not corrected');
  }

  return responseWrapper.success(res, user);
};

exports.getUserProfile = async (req, res) => {
  let userId = req.user.id;
  let user = await userService.getUserById(userId);

  return responseWrapper.success(res, user);
};

exports.updateUserProfile = async (req, res) => {
  let userId = req.user.id;

  delete req.body.roleId;

  let user = await userService.updateUser(userId, req.body);

  return responseWrapper.success(res, user);
};

exports.updateUser = async (req, res) => {
  let userId = req.params.id;
  let user = await userService.getUserById(userId);

  if (!user) {
    throw new UnauthenticatedException('User not Found');
  }

  delete req.body.password;

  user = await userService.updateUser(userId, req.body);

  return responseWrapper.success(res, user);
};

exports.deleteUser = async (req, res) => {
  let userId = req.params.id;
  await userService.deleteUser(userId);

  return responseWrapper.success(res);
};
