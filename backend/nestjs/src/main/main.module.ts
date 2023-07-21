import { Module } from '@nestjs/common';

import { ImagesService, MainService } from './services';
import { MainController } from './main.controller';
import { SharedModule } from 'src/shared/shared.module';
import { ImagesController } from './images.controller';

@Module({
  imports: [SharedModule],
  controllers: [MainController, ImagesController],
  providers: [MainService, ImagesService],
})
export class MainModule {}
