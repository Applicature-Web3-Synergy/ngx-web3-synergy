import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucAccountButtonComponent } from './account-button.component';

describe('AucAccountButtonComponent', () => {
  let component: AucAccountButtonComponent;
  let fixture: ComponentFixture<AucAccountButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AucAccountButtonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucAccountButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
