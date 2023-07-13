import { Module } from '@nestjs/common';

import { MainService } from './services';
import { MainController } from './main.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
