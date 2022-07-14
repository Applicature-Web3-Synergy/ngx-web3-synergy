import { ComponentFixture, TestBed } from '@angular/core/testing';
import { W3sAccountModalComponent } from './account-modal.component';


xdescribe('W3sAccountModalComponent', () => {
  let component: W3sAccountModalComponent;
  let fixture: ComponentFixture<W3sAccountModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [W3sAccountModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
