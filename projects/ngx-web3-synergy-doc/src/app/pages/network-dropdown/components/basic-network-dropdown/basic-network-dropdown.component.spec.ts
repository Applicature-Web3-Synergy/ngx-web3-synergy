import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicNetworkDropdownComponent } from './basic-network-dropdown.component';

describe('BasicNetworkDropdownComponent', () => {
  let component: BasicNetworkDropdownComponent;
  let fixture: ComponentFixture<BasicNetworkDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicNetworkDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicNetworkDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
