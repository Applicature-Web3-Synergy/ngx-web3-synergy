import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AucTransactionsHistoryModalComponent } from './transactions-history-modal.component';


describe('AucTransactionsHistoryModalComponent', () => {
  let component: AucTransactionsHistoryModalComponent;
  let fixture: ComponentFixture<AucTransactionsHistoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AucTransactionsHistoryModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucTransactionsHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
