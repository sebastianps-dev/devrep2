// Sync repo comment
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { I18nService } from 'nestjs-i18n';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const i18nService = app.get(I18nService) as any;

  // Habilitar CORS de forma muy permisiva para depuración
  app.enableCors();

  // Configuración de prefijo global
  app.setGlobalPrefix('api/v1');

  // Configuración de validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Interceptor para estandarizar respuestas exitosas
  app.useGlobalInterceptors(new TransformInterceptor(i18nService));

  // Filtro para estandarizar respuestas de error
  app.useGlobalFilters(new AllExceptionsFilter(i18nService));

  // Escuchar en el puerto definido o en el 4000 por defecto
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/api/v1`);
}
bootstrap();
