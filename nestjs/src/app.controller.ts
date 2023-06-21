import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { GridItem } from './models';

@Controller('main')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getList(): Array<GridItem> {
    return this.appService.getList();
  }

  @Post()
  @HttpCode(201)
  createItem(@Body() text: string): GridItem {
    return this.appService.createItem(text);
  }

  @Put(':id')
  updateItem(@Param('id') id: string, @Body() item: GridItem): GridItem {
    return this.appService.updateItem(id, item);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: string): void {
    this.appService.deleteItem(id);
  }
}
