import { Component, OnInit } from '@angular/core';

import { Crud } from 'src/app/models';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  public data: Array<Crud>;

  ngOnInit(): void {
    this.data = [
      { id: '1', text: 'Row 1' },
      { id: '2', text: 'Row 2' },
      { id: '3', text: 'Row 3' },
      { id: '4', text: 'Row 4' },
      { id: '5', text: 'Row 5' },
      { id: '6', text: 'Row 6' }
    ];
  }
}
