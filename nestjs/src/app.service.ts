import { Injectable } from '@nestjs/common';

import { GridItem } from './models';

const MOCK: Array<GridItem> = [
  { id: '1', text: 'Row 1' },
  { id: '2', text: 'Row 2' },
  { id: '3', text: 'Row 3' },
  { id: '4', text: 'Row 4' },
  { id: '5', text: 'Row 5' },
  { id: '6', text: 'Row 6' }
];

@Injectable()
export class AppService {
  getList(): Array<GridItem> {
    return MOCK;
  }

  createItem(text: string): GridItem {
    const newItem = { id: Math.floor(Math.random() * 1000).toString(), text };
    MOCK.push(newItem);
    return newItem;
  }

  updateItem(id: string, item: GridItem): GridItem {
    const index = MOCK.findIndex((i: GridItem) => i.id === id);
    if (index !== -1) {
      MOCK[index] = item;
    }
    return item;
  }

  deleteItem(id: string): void {
    const index = MOCK.findIndex((i: GridItem) => i.id === id);
    MOCK.splice(index, 1);
  }
}
