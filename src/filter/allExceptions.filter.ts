import {
  Catch,
  ArgumentsHost,
  RpcExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { MongoError } from 'mongodb';
import { RpcException } from '@nestjs/microservices';
export const ERROR = {
  DATABASE: 'MongoServerError',
  CAST: 'CastError',
  VALIDATION: 'ValidationError',
  BAD_REQUEST: 'BadRequestException',
  UNKNOWN: 'Unknown',
};
@Catch()
export class AllExceptionsFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const response = {
      error: ERROR.UNKNOWN,
      message: '',
    };
    switch (exception.name) {
      case 'MongoServerError':
        const err = exception as unknown as MongoError;
        const re = new RegExp('{(.*?)}$', 'g');
        console.log(err.message.match(re)[0]);
        const errObject = JSON.parse(JSON.stringify(err.message.match(re)[0]));
        response.message = errObject;
        if (err.code == 11000) {
          response.message = 'There is a duplicate error about ' + errObject;
        }

        break;
      case 'CastError':
        response.error = 'CAST_ERROR';
        //TODO: this should return the specefic error
        break;
      case 'ValidationError':
        response.error = 'VALIDATION_ERROR';
        break;
      case 'BadRequestException':
        response.error = 'BAD_REQUEST';
        const validatorResponse =
          exception instanceof HttpException ? exception.getResponse() : null;
        response.message = (validatorResponse as { message: string }).message;
        break;
    }
    return throwError(() => response);
  }
}
