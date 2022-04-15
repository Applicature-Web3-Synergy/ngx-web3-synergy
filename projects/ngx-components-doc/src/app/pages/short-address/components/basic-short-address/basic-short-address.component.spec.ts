import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicShortAddressComponent } from './basic-short-address.component';

describe('BasicShortAddressComponent', () => {
  let component: BasicShortAddressComponent;
  let fixture: ComponentFixture<BasicShortAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicShortAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicShortAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
