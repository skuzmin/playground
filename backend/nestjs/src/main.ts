import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import fastifyMultipart from '@fastify/multipart';
import * as dotenv from 'dotenv';
import { cpus } from 'os';
import cluster from 'node:cluster';

import { AppModule } from './app.module';
import { UwsAdapter } from './uws/uws.adapter';

// if (cluster.isPrimary) {
//   for (let i = 0; i < cpus().length; i++) {
//     cluster.fork();
//   }
// } else {
async function bootstrap() {
  // Load env file
  dotenv.config();
  // Fastify (add multipart support)
  const fastifyAdapter = new FastifyAdapter();
  fastifyAdapter.register(fastifyMultipart);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );
  // UWS
  app.useWebSocketAdapter(new UwsAdapter(8080));
  app.setGlobalPrefix('api/v1');
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Playground')
    .setDescription('The playground API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  // Server
  await app.listen(7001, '0.0.0.0');
}
bootstrap();
// }
