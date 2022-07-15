import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { W3sDialogModule } from '../dialog';
import { W3sIconModule } from '../icon';
import { W3sConnectModalComponent } from './components';
import { W3sBlockScrollHelperService, W3sInstallWalletHelperService } from '../helpers';
import { W3sConnectModule } from './connect.module';
import { W3sWalletConnectService } from './services';

export const TestW3sConnectModuleMetadata: TestModuleMetadata = {
  imports: [
    CommonModule,
    W3sDialogModule,
    W3sIconModule,
    W3sConnectModule.forRoot()
  ],
  declarations: [
    W3sConnectModalComponent
  ],
  providers: [
    W3sBlockScrollHelperService,
    W3sInstallWalletHelperService
  ]
};


describe(`W3sConnectModule`, () => {
  it('should provide W3sWalletConnectService', () => {
    TestBed.configureTestingModule(TestW3sConnectModuleMetadata);

    expect(TestBed.inject(W3sWalletConnectService)).toBeTruthy();
  });
});
