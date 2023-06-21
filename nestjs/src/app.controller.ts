import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CrudItem } from './models';

@Controller('main')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getList(): Array<CrudItem> {
    return this.appService.getList();
  }

  @Post()
  @HttpCode(201)
  createItem(@Body() text: string): CrudItem {
    return this.appService.createItem(text);
  }

  @Put()
  updateItem(@Body() item: CrudItem): CrudItem {
    return this.appService.updateItem(item);
  }

  @Delete()
  deleteItem(@Param('id') id: string): void {
    this.appService.deleteItem(id);
  }
}
