import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JsonDB, Config } from 'node-json-db';

export const db = new JsonDB(new Config("myDb", true, true, '/'));
db.push('/tasks', [])

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))
  await app.listen(4000);
}
bootstrap();
