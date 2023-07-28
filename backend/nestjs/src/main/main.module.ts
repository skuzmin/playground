import { Module } from '@nestjs/common';

import { ImagesService, MainService } from './services';
import { MainController } from './main.controller';
import { SharedModule } from 'src/shared/shared.module';
import { ImagesController } from './images.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    SharedModule,
    ClientsModule.register([
      {
        name: 'IMAGE_TRANSFORM',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'images_queue',
          socketOptions: {
            keepAlive: true
          }
        },
      },
    ]),
  ],
  controllers: [MainController, ImagesController],
  providers: [MainService, ImagesService],
})
export class MainModule { }
