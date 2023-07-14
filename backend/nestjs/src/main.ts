import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as _cluster from 'cluster';
import * as os from 'os';

import { AppModule } from './app.module';
import { UwsAdapter } from './uws/uws.adapter';

const cluster = _cluster as unknown as _cluster.Cluster; 
if (cluster.isPrimary) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
} else {
  async function bootstrap() {
    // Fastify
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
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
}


