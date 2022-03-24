import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucDropdownMenuComponent } from './dropdown-menu.component';

describe('AucDropdownMenuComponent', () => {
  let component: AucDropdownMenuComponent;
  let fixture: ComponentFixture<AucDropdownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AucDropdownMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
