const bcrypt = require('bcryptjs');

const test = async () => {
  const result = await bcrypt.hash('1234', 8);
  console.log(result);
};
