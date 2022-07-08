import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sDropdownMenuComponent } from './dropdown-menu.component';

describe('W3sDropdownMenuComponent', () => {
  let component: W3sDropdownMenuComponent;
  let fixture: ComponentFixture<W3sDropdownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3sDropdownMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
