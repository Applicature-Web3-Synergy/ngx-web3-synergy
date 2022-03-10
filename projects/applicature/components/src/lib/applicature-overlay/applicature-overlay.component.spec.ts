import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicatureOverlayComponent } from './applicature-overlay.component';

describe('ApplicatureOverlayComponent', () => {
  let component: ApplicatureOverlayComponent;
  let fixture: ComponentFixture<ApplicatureOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicatureOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicatureOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
