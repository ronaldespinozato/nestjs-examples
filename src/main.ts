import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerUtil } from './winstonlogger/logger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerUtil.getWinstonLogger() //It will log into files when app starting and app's logs.
  });
  
  // await app.useLogger(LoggerUtil.getWinstonLogger());// It will log only app's logs
  await app.listen(3000);
}
bootstrap();
