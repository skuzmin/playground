import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SseComponent } from './sse.component';

describe('SseComponent', () => {
  let component: SseComponent;
  let fixture: ComponentFixture<SseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SseComponent]
    });
    fixture = TestBed.createComponent(SseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
