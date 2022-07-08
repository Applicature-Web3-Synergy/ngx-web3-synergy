import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sInputComponent } from './input.component';

describe('W3sInputComponent', () => {
  let component: W3sInputComponent;
  let fixture: ComponentFixture<W3sInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [W3sInputComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
