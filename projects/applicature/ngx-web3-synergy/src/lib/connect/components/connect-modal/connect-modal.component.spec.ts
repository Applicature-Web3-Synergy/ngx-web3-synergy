import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W3sConnectModalComponent } from './connect-modal.component';
import { TestW3sConnectModuleMetadata } from '../../connect.module.spec';
import { W3sWalletConnectService } from '../../services';

xdescribe('W3sConnectModalComponent', () => {
  let component: W3sConnectModalComponent;
  let fixture: ComponentFixture<W3sConnectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(TestW3sConnectModuleMetadata)
    .compileComponents();

    TestBed.inject(W3sWalletConnectService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(W3sConnectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
