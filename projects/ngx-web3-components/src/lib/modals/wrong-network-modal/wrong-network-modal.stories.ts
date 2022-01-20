import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ButtonsModule } from '../../components/buttons';
import { PipesModule } from '../../pipes';
import { WalletService } from '../../services';
import { WrongNetworkModalComponent } from './wrong-network-modal.component';

export default {
  title: 'modals/WrongNetworkModal',
  component: WrongNetworkModalComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        WrongNetworkModalComponent,
      ],
      imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatRippleModule,
        ClipboardModule,
        MatDialogModule,
        HttpClientModule,
        ButtonsModule,
        ReactiveFormsModule,
        PipesModule,
      ],
      providers: [
        WalletService,
        {
          provide: MAT_DIALOG_DATA, useValue: {
            header: 'Wrong network',
            message: 'Looks like you connected to unsupported network. Please switch to Polygon.',
            switchLabel: 'Switch to Polygon',
            appearance: 'disconnect',
            chainId: '',
          }
        },
        { provide: MatDialogRef, useValue: {} }
      ],
    }),
  ],
} as Meta;

const Template: Story<WrongNetworkModalComponent> = (args: WrongNetworkModalComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
