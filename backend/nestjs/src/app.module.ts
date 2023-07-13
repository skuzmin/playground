import { Module } from '@nestjs/common';

import { SseController } from './sse/sse.controller';
import { AppGateway } from './app.gateway';
import { MainModule } from './main/main.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [MainModule, SharedModule],
  controllers: [SseController],
  providers: [AppGateway],
})
export class AppModule { }
