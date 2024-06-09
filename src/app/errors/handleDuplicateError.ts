import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  //extrace value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);
  //extracting value will be in the first capturing group
  const extractMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractMessage} is already exists`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};


export default handleDuplicateError;