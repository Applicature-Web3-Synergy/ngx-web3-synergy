import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectWalletAsIconComponent } from './connect-wallet-as-icon.component';

describe('ConnectWalletAsIconComponent', () => {
  let component: ConnectWalletAsIconComponent;
  let fixture: ComponentFixture<ConnectWalletAsIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectWalletAsIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectWalletAsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
