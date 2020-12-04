const { UnauthenticatedException } = require('../../common/errors/exceptions');
const { verifyAuthToken, decode } = require('../../common/token');

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
