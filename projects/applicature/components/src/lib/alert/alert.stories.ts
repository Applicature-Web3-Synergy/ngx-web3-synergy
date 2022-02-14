import { CommonModule } from '@angular/common';

import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { AlertComponent } from './alert.component';

export default {
  title: 'components/Alert',
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
  text: 'Alert message red color',
  color: 'red',
};

export const Blue = Template.bind({});
Blue.args = {
  text: 'Alert message blue color',
  color: 'blue',
};

export const Green = Template.bind({});
Green.args = {
  text: 'Alert message green color',
  color: 'green',
};

export const Orange = Template.bind({});
Orange.args = {
  text: 'Alert message orange color',
  color: 'orange',
};

export const Grey = Template.bind({});
Grey.args = {
  text: 'Alert message grey color',
  color: 'grey',
};

export const White = Template.bind({});
White.args = {
  text: 'Alert message white color',
  color: 'white',
};
