const jwt = require('jsonwebtoken');

exports.generateAuthToken = (userData) => {
  let payload = ({ id, name, email, role_id, mobile_number } = userData);
  return jwt.sign(payload, process.env.JWT_SECRET);
};

exports.verifyAuthToken = (jwtToken) => {
  return jwt.verify(jwtToken, process.env.JWT_SECRET);
};

exports.decode = async (jwtToken) => {
  return jwt.decode(jwtToken);
};
