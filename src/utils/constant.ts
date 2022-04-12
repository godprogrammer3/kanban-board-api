import { HttpException, HttpStatus } from '@nestjs/common';
export const ErrorNotFondException = new HttpException(
  {
    statusCode: 404,
    error: 'Bad Request',
    message: 'Ticket Not Found',
  },
  HttpStatus.NOT_FOUND,
);
