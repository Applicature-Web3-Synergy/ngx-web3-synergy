import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WrongNetworkModalComponent } from './wrong-network-modal.component';


describe('WrongNetworkModalComponent', () => {
  let component: WrongNetworkModalComponent;
  let fixture: ComponentFixture<WrongNetworkModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrongNetworkModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongNetworkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
