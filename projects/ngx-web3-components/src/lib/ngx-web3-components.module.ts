import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AccountBalanceModule } from './components/account-balance/account-balance.module';
import { AlertModule } from './components/alert/alert.module';
import { AmountFieldModule } from './components/amount-field/amount-field.module';
import { AvatarModule } from './components/avatar/avatar.module';
import { ButtonsModule } from './components/buttons';
import { HeaderBarModule } from './components/header-bar/header-bar.module';
import { WclTableModule } from './components/wcl-table/wcl-table.module';
import { TransferTokenModule } from './components/transfer-token/transfer-token.module';
import { ModalsModule } from './modals/modals.module';
import { PipesModule } from './pipes';
import { WalletService, TransactionService, TransferModalService } from './services';

const modules = [
  ButtonsModule,
  AvatarModule,
  ModalsModule,
  AccountBalanceModule,
  PipesModule,
  AlertModule,
  HeaderBarModule,
  AmountFieldModule,
  WclTableModule,
  TransferTokenModule
];

@NgModule({
  declarations: [
  ],
  imports: [
    ...modules,
  ],
  exports: [
    ...modules,
  ]
})
export class NgxWeb3ComponentsModule {
  constructor(@Optional() @SkipSelf() parentModule: NgxWeb3ComponentsModule) {
    if (parentModule) {
      throw new Error('NgxWeb3ComponentsModule is already loaded. Import it in the AppModule only!');
    }
  }

  public static forRoot(): ModuleWithProviders<NgxWeb3ComponentsModule> {
    return {
      ngModule: NgxWeb3ComponentsModule,
      providers: [
        WalletService,
        TransactionService,
        TransferModalService,
      ],
    };
  }
}
