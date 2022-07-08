import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTransactionHistoryComponent } from './basic-transaction-history.component';

describe('BasicTransactionHistoryComponent', () => {
  let component: BasicTransactionHistoryComponent;
  let fixture: ComponentFixture<BasicTransactionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicTransactionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
