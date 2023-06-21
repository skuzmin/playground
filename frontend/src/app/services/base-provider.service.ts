import { Injectable } from '@angular/core';

import { BaseProvider } from '../models/provider.model';
import { PROVIDERS_LIST } from '../constants';

@Injectable({ providedIn: 'root' })
export class BaseProviderService {
    private base: BaseProvider;
    private list: Array<BaseProvider>;
    constructor() {
        this.list = PROVIDERS_LIST;
        this.base = this.list[0];
    }

    getCurrentProvider(): BaseProvider {
        return this.base;
    }

    getProvidersList(): Array<BaseProvider> {
        return this.list;
    }

    changeProvider(newProvider: BaseProvider): void {
        this.base = newProvider;
    }
}
