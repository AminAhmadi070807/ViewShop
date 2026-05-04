import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import express from 'express';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class HttpGlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: express.Response = ctx.getResponse();

    let statusCode: HttpStatus;
    let errorDetails: any;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const response: string | object = exception.getResponse();

      errorDetails =
        typeof response === 'string' ? { message: response } : response;
    } else if (exception instanceof RpcException) {
      const rpcError: string | object = exception.getError();

      if (
        typeof rpcError === 'object' &&
        rpcError !== null &&
        'message' in rpcError
      ) {
        errorDetails = rpcError;

        if ('status' in rpcError && typeof rpcError.status === 'number') {
          statusCode = rpcError.status;
        } else statusCode = HttpStatus.BAD_REQUEST;
      } else {
        errorDetails = { message: rpcError };
        statusCode = HttpStatus.BAD_REQUEST;
      }
    }
    // eslint-disable-next-line
    else if (exception.status && typeof exception.status === 'number') {
      // eslint-disable-next-line
      statusCode = exception.status;
      // eslint-disable-next-line
      errorDetails = { message: exception.message || 'An error occurred' };
    } else {
      // eslint-disable-next-line
      errorDetails = { message: exception.message };
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    if (!Object.values(HttpStatus).includes(statusCode)) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return response.status(statusCode).json({
      ...errorDetails,
      status: statusCode,
    });
  }
}
