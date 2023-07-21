import { Controller, HttpCode, Post, Req, Res, } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

import { ImagesService } from './services';

@Controller('upload')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Post()
  @HttpCode(201)
  async uploadImage(@Req() req: FastifyRequest, @Res() res: FastifyReply): Promise<void> {
    const data = await req.file();
    const file = await data.toBuffer();
    const name = data.filename;
    try {
      await this.imagesService.uploadImage('images', name, file);
    } catch (err: unknown) {
      console.error('Error uploading image: ', err);
      throw err;
    }
    const url = await this.imagesService.generatePresignedUrl(name);
    return res.send({ url });
  }
}


