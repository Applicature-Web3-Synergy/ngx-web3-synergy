import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sTransactionsHistoryComponent } from './transactions-history.component';

xdescribe('W3sTransactionsHistoryComponent', () => {
  let component: W3sTransactionsHistoryComponent;
  let fixture: ComponentFixture<W3sTransactionsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [W3sTransactionsHistoryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sTransactionsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
