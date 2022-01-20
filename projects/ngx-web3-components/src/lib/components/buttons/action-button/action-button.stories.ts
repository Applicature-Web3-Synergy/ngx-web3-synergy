import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ActionButtonComponent } from './action-button.component';


export default {
  title: 'components/Buttons/Action Button',
  component: ActionButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatRippleModule,
      ],
    }),
  ],
} as Meta;

const Template: Story<ActionButtonComponent> = (args: ActionButtonComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
};

export const Blue = Template.bind({});
Blue.args = {
  ...Default.args,
  color: 'blue',
};

export const Red = Template.bind({});
Red.args = {
  ...Default.args,
  color: 'red',
};

export const Green = Template.bind({});
Green.args = {
  ...Default.args,
  color: 'green',
};

export const Orange = Template.bind({});
Orange.args = {
  ...Default.args,
  color: 'orange',
};

export const Grey = Template.bind({});
Grey.args = {
  ...Default.args,
  color: 'grey',
};

export const White = Template.bind({});
White.args = {
  ...Default.args,
  color: 'white',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  ...Default.args,
  fullWidth: true,
};

export const LeftIcon = Template.bind({});
LeftIcon.args = {
  color: 'white',
  label: 'Ethereum',
  src: 'assets/svg/network/eth.svg',
};

export const RightIcon = Template.bind({});
RightIcon.args = {
  color: 'red',
  label: '1 failing',
  rightIcon: 'wcl-icon-fail',
};

export const Pending = Template.bind({});
Pending.args = {
  label: '1 Pending',
  pending: true,
};

export const NoBorderRadius = Template.bind({});
NoBorderRadius.args = {
  color: 'white',
  label: 'Ethereum',
  src: 'assets/svg/network/eth.svg',
  rightIcon: 'wcl-icon-chevron-down',
  borderRadius: false,
};

export const Transparent = Template.bind({});
Transparent.args = {
  color: 'white',
  label: 'Ethereum',
  src: 'assets/svg/network/eth.svg',
  rightIcon: 'wcl-icon-chevron-down',
  borderRadius: false,
  transparent: true,
};
