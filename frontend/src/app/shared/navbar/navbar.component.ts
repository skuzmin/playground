import { Component, OnInit } from '@angular/core';

import { BaseProvider } from 'src/app/models/provider.model';
import { BaseProviderService, SseService } from 'src/app/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public base: BaseProvider;
  public providers: Array<BaseProvider>;
  constructor(private baseProviderService: BaseProviderService, private sseService: SseService) {}

  ngOnInit(): void {
    this.providers = this.baseProviderService.getProvidersList();
    this.baseProviderService.getCurrentProvider().subscribe((p: BaseProvider) => this.base = p);
  }

  changeBase(newBaseProvider: BaseProvider): void {
    this.sseService.close();
    this.baseProviderService.changeProvider(newBaseProvider);
  }
}
