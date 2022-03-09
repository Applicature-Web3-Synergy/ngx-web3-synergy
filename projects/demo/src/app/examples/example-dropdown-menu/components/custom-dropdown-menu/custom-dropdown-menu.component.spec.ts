import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDropdownMenuComponent } from './custom-dropdown-menu.component';

describe('CustomDropdownMenuComponent', () => {
  let component: CustomDropdownMenuComponent;
  let fixture: ComponentFixture<CustomDropdownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDropdownMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
