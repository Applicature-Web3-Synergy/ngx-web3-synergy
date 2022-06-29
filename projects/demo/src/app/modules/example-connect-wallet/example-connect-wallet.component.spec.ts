import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleConnectWalletComponent } from './example-connect-wallet.component';

describe('ExampleConnectWalletComponent', () => {
  let component: ExampleConnectWalletComponent;
  let fixture: ComponentFixture<ExampleConnectWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleConnectWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleConnectWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
