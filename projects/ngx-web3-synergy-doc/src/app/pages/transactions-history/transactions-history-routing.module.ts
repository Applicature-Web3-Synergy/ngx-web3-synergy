import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionsHistoryComponent } from './transactions-history.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsHistoryComponent
  }
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TransactionsHistoryRoutingModule {
}
