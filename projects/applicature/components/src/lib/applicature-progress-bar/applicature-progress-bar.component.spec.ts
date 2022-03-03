import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicatureProgressBarComponent } from './applicature-progress-bar.component';

describe('ApplicatureProgressBarComponent', () => {
  let component: ApplicatureProgressBarComponent;
  let fixture: ComponentFixture<ApplicatureProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicatureProgressBarComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicatureProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
