exports.success = (res, obj = null, status = 200) => {
  if (obj) {
    res.status(status).send(obj);
  } else {
    res.status(status).send();
  }
};
