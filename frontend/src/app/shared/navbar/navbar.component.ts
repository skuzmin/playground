import { Component, OnInit } from '@angular/core';
import { Providers } from 'src/app/constants';

import { BaseProvider } from 'src/app/models/provider.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public base: BaseProvider;
  public providers: Array<BaseProvider>;

  ngOnInit(): void {
    this.providers = [
      { id: Providers.NestJS, name: Providers.NestJS }
    ];
    this.base = this.providers[0];
  }
}
