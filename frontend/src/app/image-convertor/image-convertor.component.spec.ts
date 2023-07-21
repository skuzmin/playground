import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageConvertorComponent } from './image-convertor.component';

describe('ImageConvertorComponent', () => {
  let component: ImageConvertorComponent;
  let fixture: ComponentFixture<ImageConvertorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageConvertorComponent]
    });
    fixture = TestBed.createComponent(ImageConvertorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
