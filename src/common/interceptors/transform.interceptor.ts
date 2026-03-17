import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { I18nService } from 'nestjs-i18n';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  constructor(private readonly i18n: I18nService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      switchMap(async (data) => {
        // Determinamos la clave del mensaje
        const messageKey = data?.message || 'common.SUCCESS';
        
        // Traducimos de forma asíncrona (v10 usa Promesas)
        const translatedMessage = await this.i18n.translate(messageKey, {
          lang: request.i18nLang || 'es',
        });

        // Extraemos los datos reales si vienen envueltos
        const finalData = data?.data !== undefined ? data.data : data;

        return {
          success: true,
          statusCode: response.statusCode,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: translatedMessage as string,
          data: finalData,
        };
      }),
    );
  }
}
