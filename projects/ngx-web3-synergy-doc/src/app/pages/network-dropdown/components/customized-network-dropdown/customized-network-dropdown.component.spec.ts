import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedNetworkDropdownComponent } from './customized-network-dropdown.component';

describe('CustomizedNetworkDropdownComponent', () => {
  let component: CustomizedNetworkDropdownComponent;
  let fixture: ComponentFixture<CustomizedNetworkDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizedNetworkDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizedNetworkDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
