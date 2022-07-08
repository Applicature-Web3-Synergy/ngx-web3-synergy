import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CopyToClipboardComponent } from './copy-to-clipboard.component';

const routes: Routes = [
  {
    path: '',
    component: CopyToClipboardComponent
  }
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CopyToClipboardRoutingModule {
}
