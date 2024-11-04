import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors({
  //   origin: `${process.env.BACKEND_URL}:5173` ?? 'http://localhost:5173',
  //   methods: 'GET,HEAD,POST,DELETE',
  // });

  app.enableCors();

  const config = new DocumentBuilder()
  .setTitle('Interactive Polls')
  .setVersion('0.1')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();