import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default value
  let statusCode = err.statusCode || 500;
  let message = err.message || 'something went wrong!';

  type TErrorSource = {
    path: string | number;
    message: string;
  }[];

  //default konokichu na mille ai pathabe
  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'something went Wrong',
    },
  ];


  const handleZodError = (err: ZodError) => {
    

    const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    })

    const statusCode = 400;
    return {
      statusCode,
      message: 'Zod Validation Error',
      errorSource,
    };

  }

  if (err instanceof ZodError) {
  const simplifiedError=handleZodError(err)
    message = 'ami zod error';
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    //AmiError: err,
  });
};

export default globalErrorHandler;
