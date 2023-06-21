import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';

import { CRUD } from '../models/provider.model';
import { BaseProviderService } from './base-provider.service';
import { GridItem } from '../shared/grid/grid.model';

@Injectable({ providedIn: 'root' })
export class CrudService implements CRUD {
    private url: string;
    constructor(private http: HttpClient, private baseProviderService: BaseProviderService) { 
        this.url = `${this.baseProviderService.getCurrentProvider().url}/main`;
    }

    getList(): Observable<GridItem[]> {
        return this.http.get<GridItem[]>(this.url).pipe(take(1));
    }

    createItem(text: string): Observable<GridItem> {
        return this.http.post<GridItem>(this.url, text).pipe(take(1));
    };

    updateItem(item: GridItem): Observable<GridItem> {
        return this.http.put<GridItem>(`${this.url}/${item.id}`, item).pipe(take(1));
    };

    deleteItem(id: string): Observable<void> {
        return this.http.delete<void>(`${this.url}/${id}`).pipe(take(1));
    };
}