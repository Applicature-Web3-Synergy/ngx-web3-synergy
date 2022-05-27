import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsWithIconComponent } from './buttons-with-icon.component';

describe('ButtonsWithIconComponent', () => {
  let component: ButtonsWithIconComponent;
  let fixture: ComponentFixture<ButtonsWithIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonsWithIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsWithIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
