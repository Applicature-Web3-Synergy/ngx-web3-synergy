import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sTransactionItemComponent } from './transaction-item.component';

xdescribe('TransactionItemComponent', () => {
  let component: W3sTransactionItemComponent;
  let fixture: ComponentFixture<W3sTransactionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3sTransactionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sTransactionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
