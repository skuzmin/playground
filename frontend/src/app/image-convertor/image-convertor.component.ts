import { Component } from '@angular/core';

import { UploadService } from '../services';

@Component({
  selector: 'app-image-convertor',
  templateUrl: './image-convertor.component.html',
  styleUrls: ['./image-convertor.component.scss']
})
export class ImageConvertorComponent {
  constructor(private uploadService: UploadService) { }

  onFileSelect(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files?.length) {
      this.uploadService.upload(inputElement.files[0]).subscribe(() => console.log('Uploaded'));
    }
  }
}
