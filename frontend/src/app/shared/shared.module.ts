import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'

import { NavbarComponent } from './navbar/navbar.component';
import { TitleComponent } from './title/title.component';
import { GridComponent } from './grid/grid.component';

@NgModule({
    imports: [
        FormsModule,
        BrowserModule
    ],
    exports: [
        BrowserModule,
        FormsModule,
        NavbarComponent,
        TitleComponent,
        GridComponent
    ],
    declarations: [
        NavbarComponent,
        TitleComponent,
        GridComponent
    ],
    providers: [],
})

export class SharedModule { }
