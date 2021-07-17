import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

function initSwagger(app) {
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Kariera API')
    .setDescription('This the Restful API for the kariera challenge')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSwagger(app)
  await app.listen(process.env.PORT);
}
bootstrap();
