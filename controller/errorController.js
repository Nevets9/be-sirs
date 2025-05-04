const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;

  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/"(?:\\.|[^"\\])*"/g);
  const message = `Duplicate field value: ${value}. Please use another value!`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = err; //Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError('Invalid Token. Please Login Again!', 401);

const handleJWTExpiredError = (err) => {
  new AppError('Your token has expired. Please login again');
};

const sendErorrDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Opertional, trusted error; send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    //programming or other unknown error:dont leak  error details
  } else {
    console.error('ERROR :', err);
    //2 send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErorrDev(err, res);
  } else {
    let error = Object.create(err);

    if (error.name === 'CastError') error = handleCastErrorDB(error);

    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);

    if (error.name === 'TokenExpiredError') {
      error = handleJWTExpiredError(error);
    }

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    if (error.statusCode === 500) error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
