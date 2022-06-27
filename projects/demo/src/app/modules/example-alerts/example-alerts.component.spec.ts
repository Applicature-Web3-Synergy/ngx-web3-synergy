import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleAlertsComponent } from './example-alerts.component';

describe('ExampleAlertsComponent', () => {
  let component: ExampleAlertsComponent;
  let fixture: ComponentFixture<ExampleAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleAlertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
