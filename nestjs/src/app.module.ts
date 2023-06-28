import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'prisma/prisma.service';
import { SseController } from './sse.controller';
import { AppGateway } from './app.gateway';

@Module({
  imports: [],
  controllers: [AppController, SseController],
  providers: [AppService, PrismaService, AppGateway],
})
export class AppModule {}
