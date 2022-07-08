import { ComponentFixture, TestBed } from '@angular/core/testing';
import { W3sWrongNetworkModalComponent } from './wrong-network-modal.component';


describe('W3sWrongNetworkModalComponent', () => {
  let component: W3sWrongNetworkModalComponent;
  let fixture: ComponentFixture<W3sWrongNetworkModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [W3sWrongNetworkModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sWrongNetworkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
