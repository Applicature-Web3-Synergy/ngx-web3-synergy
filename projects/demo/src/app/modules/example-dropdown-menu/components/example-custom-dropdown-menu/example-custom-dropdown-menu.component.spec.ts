import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleCustomDropdownMenuComponent } from './example-custom-dropdown-menu.component';

describe('ExampleCustomDropdownMenuComponent', () => {
  let component: ExampleCustomDropdownMenuComponent;
  let fixture: ComponentFixture<ExampleCustomDropdownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleCustomDropdownMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleCustomDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
