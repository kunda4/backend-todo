import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JsonDB, Config } from 'node-json-db';

export const db = new JsonDB(new Config("myDb", true, true, '/'));
db.push('/tasks', [])

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();
