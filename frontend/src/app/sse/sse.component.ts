import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { SseService } from '../services';

@Component({
  selector: 'app-sse',
  templateUrl: './sse.component.html',
  styleUrls: ['./sse.component.scss']
})
export class SseComponent {
  public time: string;
  public isConnected: boolean;
  constructor(public sseService: SseService) {
    this.sseService.getStatus().subscribe((status: boolean) => this.isConnected = status);
   }

  connect(): void {
    this.sseService.getServerSentEvent().subscribe({
      next: (event: MessageEvent) => {
        const { time } = JSON.parse(event.data);
        this.time = new Date(time).toTimeString().split(' ')[0];
      },
      error: (err: MessageEvent) => {
        alert('ERRRRROR');
        console.log(err);
      }
    });
  }

  close(): void {
    this.sseService.close();
  }
}
