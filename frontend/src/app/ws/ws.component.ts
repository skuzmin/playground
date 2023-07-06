import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { filter } from 'rxjs';

import { WebsocketsService } from '../services';

@Component({
  selector: 'app-ws',
  templateUrl: './ws.component.html',
  styleUrls: ['./ws.component.scss']
})
export class WsComponent implements OnInit {
  public text: string;
  public numberResult: string;
  public colorResult: string;
  @ViewChild('input') private input: ElementRef;
  constructor(private wsService: WebsocketsService) { }

  ngOnInit(): void {
    this.text = '';
    this.numberResult = '';
    this.colorResult = '';
    this.wsService.connect()
      .pipe(filter((res: Event) => res.type !== 'open'))
      .subscribe({
        next: (res: Event) => {
          console.log(res);
          const message = res as MessageEvent<string>;
          if (message.data.length > 3) { // random number 0-999, if length > 3 then it's #color
            this.colorResult = '#' + message.data;
          } else {
            this.numberResult = message.data;
          }
        },
        error: () => console.log('WS ERROR')
      })
  }

  sendMessage(): void {
    this.wsService.send(this.text);
    this.input.nativeElement.value = '';
  }

}
