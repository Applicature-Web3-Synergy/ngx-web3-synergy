import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleAccountBalanceComponent } from './example-account-balance.component';

describe('ExampleAccountBalanceComponent', () => {
  let component: ExampleAccountBalanceComponent;
  let fixture: ComponentFixture<ExampleAccountBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleAccountBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleAccountBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
