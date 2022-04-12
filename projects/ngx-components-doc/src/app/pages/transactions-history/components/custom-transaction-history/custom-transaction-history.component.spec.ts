import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTransactionHistoryComponent } from './custom-transaction-history.component';

describe('CustomTransactionHistoryComponent', () => {
  let component: CustomTransactionHistoryComponent;
  let fixture: ComponentFixture<CustomTransactionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTransactionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
