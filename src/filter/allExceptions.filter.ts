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
  FORBIDDEN_REQUEST: 'ForbiddenException',
  UNKNOWN: 'Unknown',
};
@Catch()
export class AllExceptionsFilter implements RpcExceptionFilter<RpcException> {
  extractErrorMessage(exception: RpcException) {
    const validatorResponse =
      exception instanceof HttpException ? exception.getResponse() : null;
    return (validatorResponse as { message: string }).message;
  }
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const response = {
      error: ERROR.UNKNOWN,
      message: '',
    };
    console.log(exception);
    switch (exception.name) {
      case ERROR.DATABASE:
        const err = exception as unknown as MongoError;
        const re = new RegExp('{(.*?)}$', 'g');
        console.log(err.message.match(re)[0]);
        const errObject = JSON.parse(JSON.stringify(err.message.match(re)[0]));
        response.message = errObject;
        if (err.code == 11000) {
          response.error = 'DATABASE_ERROR';
          response.message = 'There is a duplicate error about ' + errObject;
        }

        break;
      case ERROR.CAST:
        response.error = 'CAST_ERROR';
        //TODO: this should return the specefic error
        break;
      case ERROR.VALIDATION:
        response.error = 'VALIDATION_ERROR';
        break;
      case ERROR.BAD_REQUEST:
        response.error = 'BAD_REQUEST';
        response.message = this.extractErrorMessage(exception);
        break;
      case ERROR.FORBIDDEN_REQUEST:
        response.error = 'FORBIDDEN_REQUEST';
        response.message = this.extractErrorMessage(exception);
        break;
    }
    return throwError(() => response);
  }
}
