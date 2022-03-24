import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AucWrongNetworkModalComponent } from './wrong-network-modal.component';


describe('AucWrongNetworkModalComponent', () => {
  let component: AucWrongNetworkModalComponent;
  let fixture: ComponentFixture<AucWrongNetworkModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AucWrongNetworkModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucWrongNetworkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
