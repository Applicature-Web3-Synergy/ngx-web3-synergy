import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkDropdownComponent } from './network-dropdown.component';

describe('NetworkDropdownComponent', () => {
  let component: NetworkDropdownComponent;
  let fixture: ComponentFixture<NetworkDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
