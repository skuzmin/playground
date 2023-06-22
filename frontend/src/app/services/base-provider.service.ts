import { Injectable } from '@angular/core';

import { BaseProvider } from '../models/provider.model';
import { PROVIDERS_LIST } from '../constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BaseProviderService {
    private base: BehaviorSubject<BaseProvider>;
    private list: Array<BaseProvider>;
    constructor() {
        this.list = PROVIDERS_LIST;
        this.base = new BehaviorSubject(this.list[0]);
    }

    getCurrentProvider(): BehaviorSubject<BaseProvider> {
        return this.base;
    }

    getProvidersList(): Array<BaseProvider> {
        return this.list;
    }

    changeProvider(newProvider: BaseProvider): void {
        this.base.next(newProvider);
    }
}
