import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTransactionsButtonComponent } from './recent-transactions-button.component';

describe('RecentTransactionsButtonComponent', () => {
  let component: RecentTransactionsButtonComponent;
  let fixture: ComponentFixture<RecentTransactionsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentTransactionsButtonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentTransactionsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
