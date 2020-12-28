import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerUtil } from './winstonlogger/logger.util';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LoggerUtil.getWinstonLogger() //It will log into files when app starting and app's logs.
  });

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('User accounts')
    .setDescription('It allows to create user, user accounts')
    .setVersion('1.0')    
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  
  // await app.useLogger(LoggerUtil.getWinstonLogger());// It will log only app's logs
  await app.listen(3000);
}
bootstrap();
