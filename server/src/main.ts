import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ResponseInterceptor } from './commons/interceptors/response.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  await app.listen(Number(process.env.API_PORT) || 3000);
  app.useGlobalInterceptors(new ResponseInterceptor());
}
bootstrap();
