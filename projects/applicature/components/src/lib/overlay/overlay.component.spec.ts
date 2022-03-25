import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucOverlayComponent } from './overlay.component';

describe('AucOverlayComponent', () => {
  let component: AucOverlayComponent;
  let fixture: ComponentFixture<AucOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AucOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
