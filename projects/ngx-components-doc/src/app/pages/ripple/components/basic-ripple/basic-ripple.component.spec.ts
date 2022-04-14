import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicRippleComponent } from './basic-ripple.component';

describe('BasicRippleComponent', () => {
  let component: BasicRippleComponent;
  let fixture: ComponentFixture<BasicRippleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicRippleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicRippleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
