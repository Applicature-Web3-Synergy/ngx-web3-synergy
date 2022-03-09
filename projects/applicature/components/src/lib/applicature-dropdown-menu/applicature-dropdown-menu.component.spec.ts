import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicatureDropdownMenuComponent } from './applicature-dropdown-menu.component';

describe('ApplicatureDropdownMenuComponent', () => {
  let component: ApplicatureDropdownMenuComponent;
  let fixture: ComponentFixture<ApplicatureDropdownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicatureDropdownMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicatureDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
