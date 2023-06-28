import { Component, OnInit } from '@angular/core';
import { WebsocketsService } from '../services';

@Component({
  selector: 'app-ws',
  templateUrl: './ws.component.html',
  styleUrls: ['./ws.component.scss']
})
export class WsComponent implements OnInit {
  constructor(private wsService: WebsocketsService) {}

  ngOnInit(): void {
    this.wsService.connect().subscribe({
      next: (data: Event) => {
        console.log('WS: ', data);
      },
      error: () => console.log('WS ERROR')
    })
  }

  sendMessage(): void {
    this.wsService.send('PEWPEW');
  }
}
