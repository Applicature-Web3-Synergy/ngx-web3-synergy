import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomConnectWalletComponent } from './custom-connect-wallet.component';

describe('CustomConnectWalletComponent', () => {
  let component: CustomConnectWalletComponent;
  let fixture: ComponentFixture<CustomConnectWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomConnectWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomConnectWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
