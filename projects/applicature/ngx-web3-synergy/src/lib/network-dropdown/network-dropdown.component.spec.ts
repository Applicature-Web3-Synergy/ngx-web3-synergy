import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sNetworkDropdownComponent } from './network-dropdown.component';

describe('W3sNetworkDropdownComponent', () => {
  let component: W3sNetworkDropdownComponent;
  let fixture: ComponentFixture<W3sNetworkDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3sNetworkDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sNetworkDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
