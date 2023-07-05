import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { WsAdapter } from '@nestjs/platform-ws';

import { AppModule } from './app.module';
import { UwsAdapter } from './uws/uws.adapter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  // app.useWebSocketAdapter(new WsAdapter(app));
  app.useWebSocketAdapter(new UwsAdapter(8080));
  app.setGlobalPrefix('api/v1');
  await app.listen(7001, '0.0.0.0');
}
bootstrap();
