import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AucConnectWalletComponent } from './connect-wallet.component';

describe('AucConnectWalletComponent', () => {
  let component: AucConnectWalletComponent;
  let fixture: ComponentFixture<AucConnectWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AucConnectWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AucConnectWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
