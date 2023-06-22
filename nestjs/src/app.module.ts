import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'prisma/prisma.service';
import { SseController } from './sse.controller';

@Module({
  imports: [],
  controllers: [AppController, SseController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
