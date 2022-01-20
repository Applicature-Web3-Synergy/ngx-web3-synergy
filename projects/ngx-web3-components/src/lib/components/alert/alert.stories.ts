import { CommonModule } from '@angular/common';

import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { AlertComponent } from './alert.component';

export default {
  title: 'components/Alerts',
  component: AlertComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
      ],
    }),
  ],
} as Meta;

const Template: Story<AlertComponent> = (args: AlertComponent) => ({
  props: args,
});

export const Red = Template.bind({});
Red.args = {
  color: 'red',
  icon: 'wcl-icon-fail',
  message: 'Alert message',
};

export const Blue = Template.bind({});
Blue.args = {
  ...Red.args,
  color: 'blue',
};

export const Orange = Template.bind({});
Orange.args = {
  ...Red.args,
  color: 'orange',
};

export const Green = Template.bind({});
Green.args = {
  ...Red.args,
  color: 'green',
};

export const Grey = Template.bind({});
Grey.args = {
  ...Red.args,
  color: 'grey',
};
