import { Component, OnInit } from '@angular/core';

import { CrudService } from '../services';
import { GridItem, GridPayload } from '../shared/grid/grid.model';
import { GridActions } from '../shared/grid/grid.constant';
import { Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})

export class CrudComponent implements OnInit {
  public data: Array<GridItem>;
  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.data = [];
    this.crudService.getList().subscribe((res: Array<GridItem>) => this.data = res);
  }

  onGridAction(payload: GridPayload): void {
    let request: Observable<GridItem | void>;
    switch (payload.action) {
      case GridActions.Create:
        request = this.crudService.createItem(<string>payload.data).pipe((tap((res: GridItem) => this.data.push(res))));
        break;
      case GridActions.Delete:
        request = this.crudService.deleteItem(<string>payload.data).pipe((tap(() => this.data = this.data.filter((item: GridItem) => item.id !== <string>payload.data))));
        break;
      case GridActions.Update:
        request = this.crudService.updateItem(<GridItem>payload.data).pipe(tap(() => {
          const index = this.data.findIndex((item: GridItem) => item.id === (payload.data as GridItem).id);
          this.data[index] = <GridItem>payload.data;
        }));
        break;
    }
    
    request.subscribe({
      complete: () => alert('SUCCESS!'),
      error: () => alert('ERRRRRRROR!')
    });
  }
}
