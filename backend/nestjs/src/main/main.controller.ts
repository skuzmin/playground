import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Sse } from '@nestjs/common';

import { GridItem } from './models';
import { MainService } from './services'

@Controller('main')
export class MainController {
  constructor(private readonly mainService: MainService) { }

  @Get()
  getList(): Promise<GridItem[]> {
    return this.mainService.getList();
  }

  @Post()
  @HttpCode(201)
  createItem(@Body() text: string): Promise<GridItem> {
    return this.mainService.createItem(text);
  }

  @Put(':id')
  updateItem(@Param('id') id: string, @Body() item: GridItem): Promise<GridItem> {
    return this.mainService.updateItem({ id: Number(id) }, item);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: string): void {
    this.mainService.deleteItem({ id: Number(id) });
  }
}
