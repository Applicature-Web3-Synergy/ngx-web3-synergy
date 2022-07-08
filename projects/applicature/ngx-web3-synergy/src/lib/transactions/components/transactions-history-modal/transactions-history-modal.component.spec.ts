import { ComponentFixture, TestBed } from '@angular/core/testing';
import { W3sTransactionsHistoryModalComponent } from './transactions-history-modal.component';


describe('W3sTransactionsHistoryModalComponent', () => {
  let component: W3sTransactionsHistoryModalComponent;
  let fixture: ComponentFixture<W3sTransactionsHistoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [W3sTransactionsHistoryModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sTransactionsHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
