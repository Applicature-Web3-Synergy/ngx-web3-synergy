import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3SpinnerComponent } from './spinner.component';

describe('W3SpinnerComponent', () => {
  let component: W3SpinnerComponent;
  let fixture: ComponentFixture<W3SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3SpinnerComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
