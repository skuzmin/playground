import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CrudComponent } from './crud/crud.component';
import { SseComponent } from './sse/sse.component';
import { WsComponent } from './ws/ws.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudComponent,
    SseComponent,
    WsComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
