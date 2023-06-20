import { Component, OnInit } from '@angular/core';

import { CrudItem } from 'src/app/models';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  public isAddRowVisible: boolean;
  public newItem: CrudItem;
  public data: Array<CrudItem>;

  ngOnInit(): void {
    this.cancel();
    this.data = [
      { id: '1', text: 'Row 1' },
      { id: '2', text: 'Row 2' },
      { id: '3', text: 'Row 3' },
      { id: '4', text: 'Row 4' },
      { id: '5', text: 'Row 5' },
      { id: '6', text: 'Row 6' }
    ];
  }

  add(): void {
    this.isAddRowVisible = true;
  }

  cancel(): void {
    this.isAddRowVisible = false;
    this.newItem = {id: '', text: ''};
  }

  edit(item: CrudItem): void {
    this.isAddRowVisible = true;
    this.newItem = Object.create(item);
  }

  save(): void {
    if (!this.newItem.text.trim()) {
      return;
    }
    if(this.newItem.id) {
      const index = this.data.findIndex((item: CrudItem) => item.id === this.newItem.id);
      this.data[index] = this.newItem;
    } else {
      this.newItem.id = Math.floor(Math.random() * 1000).toString();
      this.data.push(this.newItem);
    }
    this.cancel();
  }

  delete(item: CrudItem, index: number): void {
    if(confirm(`Are you sure want to delete ID: ${item.id} ?`)) {
      this.data.splice(index, 1);
    }
  }
}
