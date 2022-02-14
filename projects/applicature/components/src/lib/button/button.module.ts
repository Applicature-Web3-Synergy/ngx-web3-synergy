import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IconModule } from '../icon/icon.module';
import { ButtonComponent } from './button.component';

@NgModule({
  declarations: [
    ButtonComponent,
  ],
  exports: [
    ButtonComponent,
  ],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        IconModule,
    ]
})
export class ButtonModule {
}
