import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucTransactionsHistoryComponent } from './transactions-history.component';

describe('AucTransactionsHistoryComponent', () => {
  let component: AucTransactionsHistoryComponent;
  let fixture: ComponentFixture<AucTransactionsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AucTransactionsHistoryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucTransactionsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
