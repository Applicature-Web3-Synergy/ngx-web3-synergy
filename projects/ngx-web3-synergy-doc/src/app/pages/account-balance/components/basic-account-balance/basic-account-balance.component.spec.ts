import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicAccountBalanceComponent } from './basic-account-balance.component';

describe('BasicAccountBalanceComponent', () => {
  let component: BasicAccountBalanceComponent;
  let fixture: ComponentFixture<BasicAccountBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicAccountBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicAccountBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
