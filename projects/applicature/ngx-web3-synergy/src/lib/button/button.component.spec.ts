import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sButtonComponent } from './button.component';

describe('W3sIdenticonDirective', () => {
  let component: W3sButtonComponent;
  let fixture: ComponentFixture<W3sButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3sButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
