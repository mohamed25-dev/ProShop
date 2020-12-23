const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();

exports.uploadMiddleware = (req, res, next) => {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      cb(
        null,
        `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

  const checkFileType = (file, cb) => {
    const fileTypes = /jpg|jpeg|png/;
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      return cb(null, true);
    }

    return cb('Image only !!');
  };

  const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).single('image');

  upload(req, res, function (err) {
    if (err) {
      throw new Error('Something went worong');
    }
    next();
  });
};
