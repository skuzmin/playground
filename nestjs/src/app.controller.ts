import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { GridItem } from './models';

@Controller('main')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getList(): Promise<GridItem[]> {
    return this.appService.getList();
  }

  @Post()
  @HttpCode(201)
  async createItem(@Body() text: string): Promise<GridItem> {
    return this.appService.createItem(text);
  }

  @Put(':id')
  async updateItem(@Param('id') id: string, @Body() item: GridItem): Promise<GridItem> {
    return this.appService.updateItem({ id: Number(id) }, item);
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: string): Promise<void> {
    this.appService.deleteItem({ id: Number(id) });
  }
}
