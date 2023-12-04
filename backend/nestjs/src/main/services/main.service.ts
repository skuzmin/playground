import { Injectable } from '@nestjs/common';

import { GridItem } from '../models';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class MainService {
  constructor(private prisma: PrismaService) {}

  getList(): Promise<GridItem[]> {
    return this.prisma.items.findMany();
  }

  createItem(text: string): Promise<GridItem> {
    const data = { text, comment: '' };
    return this.prisma.items.create({ data });
  }

  updateItem(where: any, data: GridItem): Promise<GridItem> {
    return this.prisma.items.update({ data, where });
  }

  async deleteItem(where: any): Promise<void> {
    await this.prisma.items.delete({ where });
  }
}
