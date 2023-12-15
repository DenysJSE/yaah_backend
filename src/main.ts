import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";

async function start() {
  const PORT = process.env.PORT || 7000;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')
  app.enableCors({
    origin: true,
    credentials: true,
  })

  const config = new DocumentBuilder()
    .setTitle('Yaah - Your Academy At Home')
    .setDescription('The yaah API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server started in the port: ${PORT}`));
}

start();
