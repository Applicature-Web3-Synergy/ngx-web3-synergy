import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedDropdownComponent } from './customized-dropdown.component';

describe('CustomizedDropdownComponent', () => {
  let component: CustomizedDropdownComponent;
  let fixture: ComponentFixture<CustomizedDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizedDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizedDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
