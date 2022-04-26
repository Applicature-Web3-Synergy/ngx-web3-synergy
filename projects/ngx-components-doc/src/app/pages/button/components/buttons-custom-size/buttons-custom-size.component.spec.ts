import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsCustomSizeComponent } from './buttons-custom-size.component';

describe('ButtonsCustomSizeComponent', () => {
  let component: ButtonsCustomSizeComponent;
  let fixture: ComponentFixture<ButtonsCustomSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonsCustomSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsCustomSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
