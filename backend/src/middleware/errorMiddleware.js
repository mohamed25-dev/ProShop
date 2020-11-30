const dev = function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err,
  });
};

const prod = function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {},
  });
};

module.exports = { prod, dev };
