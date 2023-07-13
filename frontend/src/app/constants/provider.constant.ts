export enum Providers {
    NestJS = 'NestJS',
    Golang = 'Golang'
}

export const PROVIDERS_LIST = [
    { id: Providers.NestJS, name: Providers.NestJS, url: 'nestjs' },
    { id: Providers.Golang, name: Providers.Golang, url: 'golang' }
];

export const PROVIDER_KEY = 'pg-backend-provider';