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
  public list: Array<string>;
  @ViewChild('input') private input: ElementRef;
  constructor(private wsService: WebsocketsService) { }

  ngOnInit(): void {
    this.text = '';
    this.list = [];
    this.wsService.connect()
      .pipe(filter((res: Event) => res.type !== 'open'))
      .subscribe({
        next: (res: Event) => {
          const message = res as MessageEvent<string>;
          const { time, text } = JSON.parse(message.data);
          this.list.push(`${time} :: ${text}`);
        },
        error: () => console.log('WS ERROR')
      })
  }

  sendMessage(): void {
    this.wsService.send(this.text);
    this.input.nativeElement.value = '';
  }
}
