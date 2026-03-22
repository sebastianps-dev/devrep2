import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres', // Cambiar a 'mysql' si prefieres
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: parseInt(configService.get<string>('DB_PORT', '5432'), 10),
  username: configService.get<string>('DB_USERNAME', 'postgres'),
  password: configService.get<string>('DB_PASSWORD', 'postgres'),
  database: configService.get<string>('DB_NAME', 'casas_db'),
  autoLoadEntities: true, // Registra automáticamente las entidades de los módulos
  synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true' || configService.get<string>('NODE_ENV') !== 'production',
});
