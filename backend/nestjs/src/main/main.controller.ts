import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Sse } from '@nestjs/common';

import { GridItem } from './models';
import { MainService } from './services'

@Controller('main')
export class MainController {
  constructor(private readonly MainService: MainService) { }

  @Get()
  getList(): Promise<GridItem[]> {
    return this.MainService.getList();
  }

  @Post()
  @HttpCode(201)
  createItem(@Body() text: string): Promise<GridItem> {
    return this.MainService.createItem(text);
  }

  @Put(':id')
  updateItem(@Param('id') id: string, @Body() item: GridItem): Promise<GridItem> {
    return this.MainService.updateItem({ id: Number(id) }, item);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: string): void {
    this.MainService.deleteItem({ id: Number(id) });
  }
}
