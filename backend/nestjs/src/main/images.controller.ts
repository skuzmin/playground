import { Controller, HttpCode, Post, Req, } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { ImagesService } from './services';

@Controller('upload')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Post()
  @HttpCode(201)
  async uploadImage(@Req() req: FastifyRequest): Promise<void> {
    const data = await req.file();
    const file = await data.toBuffer();
    try {
      await this.imagesService.uploadImage('images', data.filename, file);
    } catch (err: unknown) {
      console.error('Error uploading image: ', err);
      throw err;
    }
  }
}


