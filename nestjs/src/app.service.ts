import { Injectable } from '@nestjs/common';

import { GridItem } from './models';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  async getList(): Promise<GridItem[]> {
    return this.prisma.items.findMany();
  }

  async createItem(text: string): Promise<GridItem> {
    const data = { id: Math.floor(Math.random() * 1000), text };
    return this.prisma.items.create({ data });
  }

  async updateItem(where: Prisma.itemsWhereUniqueInput, data: GridItem): Promise<GridItem> {
    return this.prisma.items.update({ data, where });
  }

  async deleteItem(where: Prisma.itemsWhereUniqueInput): Promise<void> {
    this.prisma.items.delete({ where });
  }
}
