import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JsonDB, Config } from 'node-json-db';


export const db = new JsonDB(new Config("myDb", true, true, '/'));

export const initializeDb = async () =>{
if(!(await db.exists('/categories'))) db.push('/categories', [])
if(!(await db.exists('/tasks'))) db.push('/tasks',[])
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))
  const config = new DocumentBuilder()
  .setTitle('Backend Todo Project')
  .setDescription('The Backend Todo Simple Project')
  .setVersion('1.0')
  .addTag('Todo')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  await app.listen(4000);
}
bootstrap();
