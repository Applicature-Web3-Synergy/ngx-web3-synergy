import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sAlertComponent } from './alert.component';

describe('W3sAlertComponent', () => {
  let component: W3sAlertComponent;
  let fixture: ComponentFixture<W3sAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3sAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
