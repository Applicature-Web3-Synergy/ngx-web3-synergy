import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicConnectWalletComponent } from './basic-connect-wallet.component';

describe('BasicConnectWalletComponent', () => {
  let component: BasicConnectWalletComponent;
  let fixture: ComponentFixture<BasicConnectWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicConnectWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicConnectWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
