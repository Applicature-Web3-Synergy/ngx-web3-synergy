import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucNetworkDropdownComponent } from './network-dropdown.component';

describe('AucNetworkDropdownComponent', () => {
  let component: AucNetworkDropdownComponent;
  let fixture: ComponentFixture<AucNetworkDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AucNetworkDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucNetworkDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
