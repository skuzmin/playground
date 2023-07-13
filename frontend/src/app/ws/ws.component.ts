import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
  public isConnected: boolean;
  @ViewChild('input') private input: ElementRef;
  constructor(private wsService: WebsocketsService) { }

  ngOnInit(): void {
    this.text = '';
    this.numberResult = '';
    this.colorResult = '';
    this.isConnected = false;
  }

  sendMessage(): void {
    this.wsService.send(this.text);
    this.input.nativeElement.value = '';
  }

  connect(): void {
    this.wsService.connect()
      .subscribe({
        next: (res: Event) => {
          console.log('WS: ', res);
          switch (res.type) {
            case 'open':
              this.isConnected = true;
              break;
            case 'close':
              this.isConnected = false;
              break;
            default:
              const message = res as MessageEvent<string>;
              if (message.data.length > 3) { // random number 0-999, if length > 3 then it's #color
                this.colorResult = '#' + message.data;
              } else {
                this.numberResult = message.data;
              }
          }
        },
        error: () => console.log('WS ERROR')
      })
  }

}
