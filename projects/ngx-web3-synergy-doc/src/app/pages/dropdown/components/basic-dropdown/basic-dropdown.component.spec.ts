import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDropdownComponent } from './basic-dropdown.component';

describe('BasicDropdownComponent', () => {
  let component: BasicDropdownComponent;
  let fixture: ComponentFixture<BasicDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
