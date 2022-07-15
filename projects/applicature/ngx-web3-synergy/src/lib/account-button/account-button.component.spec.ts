import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sAccountButtonComponent } from './account-button.component';

xdescribe('W3sAccountButtonComponent', () => {
  let component: W3sAccountButtonComponent;
  let fixture: ComponentFixture<W3sAccountButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [W3sAccountButtonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sAccountButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
