const {
  UnauthenticatedException,
  UnauthorizedException,
} = require('../../common/errors/exceptions');
const { verifyAuthToken, decode } = require('../../common/token');
const { Roles } = require('../../common/constants');

exports.isAuthenticated = async (req, res, next) => {
  let token = req.headers.authorization;
  token = token.split(' ')[1];

  if (!token) {
    throw new UnauthenticatedException('No Token Provided');
  }

  let verified = verifyAuthToken(token);
  if (!verified) {
    throw new UnauthenticatedException('Invalid Token');
  }

  let user = await decode(token);
  req.user = user;

  next();
};

exports.isAdmin = async (req, res, next) => {
  if (req.user && req.user.roleId === Roles.ADMIN_ROLE) {
    return next();
  }

  throw new UnauthorizedException(
    "You don't have permissions to access this route"
  );
};
