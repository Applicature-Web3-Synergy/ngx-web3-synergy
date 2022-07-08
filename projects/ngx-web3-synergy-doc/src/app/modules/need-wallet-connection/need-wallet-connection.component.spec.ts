import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedWalletConnectionComponent } from './need-wallet-connection.component';

describe('NeedWalletConnectionComponent', () => {
  let component: NeedWalletConnectionComponent;
  let fixture: ComponentFixture<NeedWalletConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeedWalletConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedWalletConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
