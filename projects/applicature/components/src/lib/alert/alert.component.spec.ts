import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucAlertComponent } from './alert.component';

describe('AucAlertComponent', () => {
  let component: AucAlertComponent;
  let fixture: ComponentFixture<AucAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AucAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
