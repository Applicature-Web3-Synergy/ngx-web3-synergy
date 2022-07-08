import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAlertComponent } from './basic-alert.component';

describe('BasicAlertComponent', () => {
  let component: BasicAlertComponent;
  let fixture: ComponentFixture<BasicAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
