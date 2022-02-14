import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsHistoryModalComponent } from './transactions-history-modal.component';


describe('TransactionsHistoryModalComponent', () => {
  let component: TransactionsHistoryModalComponent;
  let fixture: ComponentFixture<TransactionsHistoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsHistoryModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
