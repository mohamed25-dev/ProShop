const FlakeIdGen = require('flake-idgen');
const intformat = require('biguint-format');
const generator = new FlakeIdGen();

exports.getId = function () {
  return intformat(generator.next(), 'dec');
};
