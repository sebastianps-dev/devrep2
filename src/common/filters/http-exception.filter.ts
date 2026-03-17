import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'common.ERROR' };

    // Intentar traducir el mensaje del error
    let message = exceptionResponse.message || exceptionResponse;
    if (Array.isArray(message)) {
      // Si son errores de validación (class-validator)
      message = message.join(', ');
    } else if (typeof message === 'string') {
      // v10 usa traducción asíncrona por defecto
      message = await this.i18n.translate(message, {
        lang: request.i18nLang || 'es',
        defaultValue: message,
      });
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
      error: exception.name || 'Error',
    });
  }
}
