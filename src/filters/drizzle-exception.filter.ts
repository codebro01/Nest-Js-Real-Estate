// src/filters/drizzle-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  //   HttpException,
  HttpStatus,
  ExecutionContext,
} from '@nestjs/common';
import { Request, Response } from 'express';
// import { DrizzleQueryError } from 'drizzle-orm';

// interface drizzleQueryError extends DrizzleQueryError {
//   constraint: string;
//   code: string;
// }

@Catch()
export class DrizzleExceptionFilter implements ExceptionFilter {
  catch(exception: any, context: ExecutionContext) {
    console.log(exception);
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // console.error('🔥 Exception caught:', {
    //   message: exception.message,
    //   code: exception.code,
    //   cause: exception.cause,
    // });

    //!  Handle Postgres duplicate key (wrapped in cause)
    if (exception.cause?.code === '23505') {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.cause.detail,
        error: exception.cause.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    //!  Handle network-level errors (top-level, not wrapped in cause)
    if (exception.code === 'ENOTFOUND' || exception.code === 'ECONNREFUSED') {
      return response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Unstable network connection!!!',
        error: exception.code,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    //! Handle timeouts
    if (exception.code === 'ETIMEDOUT') {
      return response.status(HttpStatus.GATEWAY_TIMEOUT).json({
        statusCode: HttpStatus.GATEWAY_TIMEOUT,
        message: 'Database connection timed out',
        error: 'TIMEOUT',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    //! Default fallback
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message:
        exception?.response?.message ||
        exception?.response?.message[0] ||
        exception?.message ||
        'Unexpected database error',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
