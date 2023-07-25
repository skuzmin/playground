import { Controller, HttpCode, Inject, Post, Req, Res, } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

import { ImagesService } from './services';

@Controller('upload')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService, @Inject('IMAGE_TRANSFORM') private client: ClientProxy) { }

  @Post()
  @HttpCode(201)
  async uploadImage(@Req() req: FastifyRequest, @Res() res: FastifyReply): Promise<void> {
    const options = { limits: { fileSize: 3 * 1024 * 1024 } };
    const data = await req.file(options);
    const file = await data.toBuffer();
    const name = data.filename;
    try {
      await this.imagesService.uploadImage('images', name, file);
    } catch (err: unknown) {
      console.error('Error uploading image: ', err);
      throw err;
    }
    try {
      console.log('MESSAGE SENT');
      await lastValueFrom(this.client.send("images", { name: 'test' }));
    } catch (err: unknown) {
      console.error('Error uploading image: ', err);
      throw err;
    }
    const url = await this.imagesService.generatePresignedUrl(name);
    return res.send({ url });
  }
}


