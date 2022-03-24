import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucSpinnerComponent } from './spinner.component';

describe('AucSpinnerComponent', () => {
  let component: AucSpinnerComponent;
  let fixture: ComponentFixture<AucSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AucSpinnerComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
