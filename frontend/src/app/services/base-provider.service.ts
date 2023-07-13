import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { BaseProvider } from '../models/provider.model';
import { PROVIDERS_LIST, PROVIDER_KEY } from '../constants';

@Injectable({ providedIn: 'root' })
export class BaseProviderService {
    private base$: BehaviorSubject<BaseProvider>;
    private list: Array<BaseProvider>;
    constructor() {
        this.list = PROVIDERS_LIST;
        this.base$ = new BehaviorSubject(this.getInitialProvider());
    }

    getInitialProvider(): BaseProvider {
        const savedProviderId = localStorage.getItem(PROVIDER_KEY);
        const savedProvider = this.list.find((p: BaseProvider) => p.id === savedProviderId);
      
        return savedProvider ?? this.list[0];
    }

    getCurrentProvider(): BehaviorSubject<BaseProvider> {
        return this.base$;
    }

    getProvidersList(): Array<BaseProvider> {
        return this.list;
    }

    changeProvider(newProvider: BaseProvider): void {
        this.base$.next(newProvider);
        localStorage.setItem(PROVIDER_KEY, newProvider.id);
    }
}
