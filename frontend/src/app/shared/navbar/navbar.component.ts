import { Component, OnInit } from '@angular/core';

import { BaseProvider } from 'src/app/models/provider.model';
import { BaseProviderService } from 'src/app/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public base: BaseProvider;
  public providers: Array<BaseProvider>;
  constructor(private baseProviderService: BaseProviderService) {}

  ngOnInit(): void {
    this.providers = this.baseProviderService.getProvidersList();
    this.base = this.baseProviderService.getCurrentProvider();
  }

  changeBase(newBaseProvider: BaseProvider): void {
    this.baseProviderService.changeProvider(newBaseProvider);
  }
}
