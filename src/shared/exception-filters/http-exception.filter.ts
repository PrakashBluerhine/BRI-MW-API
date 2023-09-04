import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, ConflictException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {

    catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if(exception['response'] && exception['response']['errors']) { // Validation exceptions

      return {
        status: HttpStatus.BAD_REQUEST,
        message: exception['response']['message'],
        errors: exception['response']['errors'],
      };
    } else if(exception['response'] && exception['response']['message'] && exception['status'] === 409){ // Conflict exception

      return {
        status: HttpStatus.CONFLICT,
        message: exception['response']['message'],
        errors: null,
      };

    }else if(exception['response'] && exception['response']['message'] && exception['status'] === 401){ // Conflict exception

      return {
        status: HttpStatus.UNAUTHORIZED,
        message: exception['response']['message'],
        errors: null,
      };

    } else { // Not found Exception

      return {
        status: HttpStatus.NOT_FOUND,
        message: exception['response']['message'],
        errors: null,
      };

    }
    
  }
}