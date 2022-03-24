import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucAccountBalanceComponent } from './account-balance.component';

describe('AucAccountBalanceComponent', () => {
  let component: AucAccountBalanceComponent;
  let fixture: ComponentFixture<AucAccountBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AucAccountBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucAccountBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
