import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentTransactionsModalComponent } from './recent-transactions-modal.component';


describe('RecentTransactionsModalComponent', () => {
  let component: RecentTransactionsModalComponent;
  let fixture: ComponentFixture<RecentTransactionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentTransactionsModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentTransactionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
