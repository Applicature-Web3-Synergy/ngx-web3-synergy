import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicatureSpinnerComponent } from './applicature-spinner.component';

describe('ApplicatureSpinnerComponent', () => {
  let component: ApplicatureSpinnerComponent;
  let fixture: ComponentFixture<ApplicatureSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicatureSpinnerComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicatureSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
