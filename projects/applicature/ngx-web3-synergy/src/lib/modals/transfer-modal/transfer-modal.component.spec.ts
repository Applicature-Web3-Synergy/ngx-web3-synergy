import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sTransferModalComponent } from './transfer-modal.component';


describe('W3sTransferModalComponent', () => {
  let component: W3sTransferModalComponent;
  let fixture: ComponentFixture<W3sTransferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [W3sTransferModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sTransferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
