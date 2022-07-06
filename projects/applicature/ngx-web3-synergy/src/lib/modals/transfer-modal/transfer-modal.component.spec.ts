import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AucTransferModalComponent } from './transfer-modal.component';


describe('AucTransferModalComponent', () => {
  let component: AucTransferModalComponent;
  let fixture: ComponentFixture<AucTransferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AucTransferModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucTransferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
