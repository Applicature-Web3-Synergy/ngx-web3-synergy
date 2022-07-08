import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sAccountBalanceComponent } from './account-balance.component';

describe('W3sAccountBalanceComponent', () => {
  let component: W3sAccountBalanceComponent;
  let fixture: ComponentFixture<W3sAccountBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3sAccountBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sAccountBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
