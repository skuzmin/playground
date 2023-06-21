import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { GridItem, GridPayload } from './grid.model';
import { GridActions } from './grid.constant';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  public isAddRowVisible: boolean;
  public newItem: GridItem;
  @Input() data: Array<GridItem> = [];
  @Output() action: EventEmitter<GridPayload> = new EventEmitter();

  ngOnInit(): void {
    this.cancel();
  }

  //#region Actions
  add(): void {
    this.isAddRowVisible = true;
  }

  cancel(): void {
    this.isAddRowVisible = false;
    this.newItem = {id: '', text: ''};
  }

  edit(item: GridItem): void {
    this.isAddRowVisible = true;
    this.newItem = Object.assign({}, item);
  }
  //#endregion

  //#region API
  save(): void {
    if (!this.newItem.text.trim()) {
      return;
    }
    if(this.newItem.id) {
      this.action.emit({action: GridActions.Update, data: this.newItem});
    } else {
      this.action.emit({action: GridActions.Create, data: this.newItem.text});
    }
    this.cancel();
  }

  delete(item: GridItem): void {
    if(confirm(`Are you sure want to delete ID: ${item.id} ?`)) {
      this.action.emit({action: GridActions.Delete, data: item.id});
    }
  }
  //#endregion
}
