import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { GridItem } from '../models';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class MainService {
  constructor(private prisma: PrismaService) { }

  getList(): Promise<GridItem[]> {
    return this.prisma.items.findMany();
  }

  createItem(text: string): Promise<GridItem> {
    const data = { id: Math.floor(Math.random() * 1000), text };
    return this.prisma.items.create({ data });
  }

  updateItem(where: Prisma.itemsWhereUniqueInput, data: GridItem): Promise<GridItem> {
    return this.prisma.items.update({ data, where });
  }

  async deleteItem(where: Prisma.itemsWhereUniqueInput): Promise<void> {
    await this.prisma.items.delete({ where });
  }
}
