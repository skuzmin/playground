import { Controller, HttpCode, Inject, Post, Req, Res, } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
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
    const name = `${this.generateGUID()}-${data.filename}`;
    try {
      await this.imagesService.uploadImage('images', name, file);
    } catch (err: unknown) {
      console.error('Error uploading image: ', err);
      throw err;
    }
    try {
      await lastValueFrom(this.client.send({ cmd: 'images' }, { name }));
    } catch (err: unknown) {
      console.error('Error image transform: ', err);
      throw err;
    }
    return res.send({ url: `/images/${name}` });
  }

  generateGUID(): string {
    const guidTemplate = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return guidTemplate.replace(/[xy]/g, (c: string) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}


