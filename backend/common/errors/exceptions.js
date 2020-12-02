const ErrorHandler = require('./errorHandler');

class ServerException extends ErrorHandler {
  constructor(message) {
    super(message || 'Server error', 500);
  }
}

class InvalidInputException extends ErrorHandler {
  constructor(message) {
    super(message || 'Invalid input', 400);
  }
}

class UnauthorizedException extends ErrorHandler {
  constructor(message) {
    super(message || 'Unauthorized', 403);
  }
}

class UnauthenticatedException extends ErrorHandler {
  constructor(message) {
    super(message || 'Unauthorized', 401);
  }
}

class NotFoundException extends ErrorHandler {
  constructor(message) {
    super(message || 'Not found', 404);
  }
}

class InvalidMobileNumberException extends ErrorHandler {
  constructor(message) {
    super(message || 'Invalid mobile', 400);
  }
}

class BadRequestException extends ErrorHandler {
  constructor(message) {
    super(message || i18n.__('Bad Request'), 400);
  }
}

class InvalidUserIdException extends ErrorHandler {
  constructor(message) {
    super(message || 'Invalid user id', 400);
  }
}

class BlockedUserException extends ErrorHandler {
  constructor(message) {
    super(message || i18n.__('Account is blocked'), 403);
  }
}

module.exports = {
  ServerException,
  InvalidInputException,
  UnauthorizedException,
  UnauthenticatedException,
  NotFoundException,
  InvalidMobileNumberException,
  InvalidUserIdException,
  BlockedUserException,
  BadRequestException,
};
