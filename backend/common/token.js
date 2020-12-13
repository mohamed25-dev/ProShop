const jwt = require('jsonwebtoken');

exports.generateAuthToken = (userData) => {
  console.log(userData);
  let payload = ({ id, name, email, roleId, mobileNumber } = userData);
  return jwt.sign(payload, process.env.JWT_SECRET);
};

exports.verifyAuthToken = (jwtToken) => {
  return jwt.verify(jwtToken, process.env.JWT_SECRET);
};

exports.decode = async (jwtToken) => {
  return jwt.decode(jwtToken);
};
