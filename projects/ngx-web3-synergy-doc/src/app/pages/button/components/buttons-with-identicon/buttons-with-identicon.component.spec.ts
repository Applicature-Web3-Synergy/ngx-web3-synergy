import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsWithIdenticonComponent } from './buttons-with-identicon.component';

describe('ButtonsWithIdenticonComponent', () => {
  let component: ButtonsWithIdenticonComponent;
  let fixture: ComponentFixture<ButtonsWithIdenticonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonsWithIdenticonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsWithIdenticonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
