import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedAccountBalanceComponent } from './customized-account-balance.component';

describe('CustomizedAccountBalanceComponent', () => {
  let component: CustomizedAccountBalanceComponent;
  let fixture: ComponentFixture<CustomizedAccountBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizedAccountBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizedAccountBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
