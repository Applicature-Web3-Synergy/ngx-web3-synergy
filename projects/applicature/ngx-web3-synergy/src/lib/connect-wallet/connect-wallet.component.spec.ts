import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sConnectWalletComponent } from './connect-wallet.component';

describe('W3sConnectWalletComponent', () => {
  let component: W3sConnectWalletComponent;
  let fixture: ComponentFixture<W3sConnectWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ W3sConnectWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sConnectWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
