import { Component } from '@angular/core';

import { UploadService } from '../services';
import { ImageTransformResponse } from '../models';
import { finalize } from 'rxjs';

const TESTING_HACK = 'http://192.168.56.1:9000';

@Component({
  selector: 'app-image-convertor',
  templateUrl: './image-convertor.component.html',
  styleUrls: ['./image-convertor.component.scss']
})
export class ImageConvertorComponent {
  public imageUrl: string;
  public isLoading: boolean;
  constructor(private uploadService: UploadService) { }

  onFileSelect(event: Event): void {
    this.imageUrl = '';
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files?.length) {
      this.isLoading = true;
      this.uploadService.upload(inputElement.files[0])
        .pipe(finalize(() => this.isLoading = false))
        .subscribe((res: ImageTransformResponse) => this.imageUrl = `${TESTING_HACK}${res.url}`);
    }
  }
}
