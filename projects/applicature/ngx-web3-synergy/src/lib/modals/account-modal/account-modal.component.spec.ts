import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AucAccountModalComponent } from './account-modal.component';


describe('AucAccountModalComponent', () => {
  let component: AucAccountModalComponent;
  let fixture: ComponentFixture<AucAccountModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AucAccountModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
