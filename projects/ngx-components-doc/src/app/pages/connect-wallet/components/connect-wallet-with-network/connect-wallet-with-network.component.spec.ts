import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectWalletWithNetworkComponent } from './connect-wallet-with-network.component';

describe('ConnectWalletWithNetworkComponent', () => {
  let component: ConnectWalletWithNetworkComponent;
  let fixture: ComponentFixture<ConnectWalletWithNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectWalletWithNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectWalletWithNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
