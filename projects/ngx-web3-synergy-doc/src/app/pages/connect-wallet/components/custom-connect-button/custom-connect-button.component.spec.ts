import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomConnectButtonComponent } from './custom-connect-button.component';

describe('CustomConnectButtonComponent', () => {
  let component: CustomConnectButtonComponent;
  let fixture: ComponentFixture<CustomConnectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomConnectButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomConnectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
