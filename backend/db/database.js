require('dotenv').config();

const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  logging: process.env.DB_LOGGING === 'true',
  benchmark: process.env.DB_BENCHMARK === 'true',
  dialect: process.env.DB_DIALECT,
  define: {
    charset: process.env.DB_CHARSET,
    collate: process.env.DB_COLLATE,
    timestamps: false,
    underscored: false,
  },
};

const prod = Object.assign({}, config);

prod.pool = {
  max: parseInt(process.env.DB_POOL_MAX),
  min: parseInt(process.env.DB_POOL_MIN),
  idle: parseInt(process.env.DB_POOL_IDLE),
};

module.exports = {
  development: config,
  local: config,
  production: prod,
};
