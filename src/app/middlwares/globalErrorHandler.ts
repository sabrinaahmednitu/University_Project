import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';
import { TErrorSources } from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default value
  let statusCode = err.statusCode || 500;
  let message = err.message || 'something went wrong!';

  //default konokichu na mille ai pathabe
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'something went Wrong',
    },
  ];


  //customized zod validation errror
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  //customized mongoose validation errror
  else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
    return res.status(statusCode).json({
      success: false,
      message,
      errorSources,
      stack: config.NODE_ENV === 'development' ? err?.stack : null,
      //AmiError: err,
    });
};

export default globalErrorHandler;
