import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class UploadService {
    constructor(private http: HttpClient) { }

    upload(file: File): Observable<object> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post('nestjs/upload', formData).pipe(take(1));
    }
}