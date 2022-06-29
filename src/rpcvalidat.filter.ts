import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';

@Catch(HttpException)
export class RpcValidationFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    //return new RpcException(exception.getResponse());
    console.log('1');
    return throwError(() => {
      //console.log('2');
      return exception.getResponse();
      // const res = exception.getResponse();
      // console.log('3');
      //  throw new Error(`Invalid time ${100}`);
    });
  }
}
