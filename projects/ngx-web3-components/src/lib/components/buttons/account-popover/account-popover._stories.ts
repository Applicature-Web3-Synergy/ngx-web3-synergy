import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';

import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { PipesModule } from '../../../pipes';
import { AvatarModule } from '../../avatar/avatar.module';
import { ButtonsModule } from '../index';

import { AccountPopoverComponent } from './account-popover.component';

export default {
  title: 'components/Account Popover',
  component: AccountPopoverComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        PipesModule,
        AvatarModule,
        ButtonsModule,
        ClipboardModule,
        MatRippleModule,
      ],
    }),
  ],
} as Meta;

const Template: Story<AccountPopoverComponent> = (args: AccountPopoverComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  account: { address: '0xaC294402CEaCf44E6e279661B73c2C9d98c1596e', name: 'Account Name' },
  options: [],
};
