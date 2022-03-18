import { CommonModule } from '@angular/common';

import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AS_COLOR_GROUP } from '@applicature/styles';

import { AucAlertComponent } from './alert.component';


export default {
  title: 'components/Alert',
  component: AucAlertComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
      ],
    }),
  ],
} as Meta;

const Template: Story<AucAlertComponent> = (args: AucAlertComponent) => ({
  props: args,
});

export const Red = Template.bind({});
Red.args = {
  text: 'Alert message red color',
  color: AS_COLOR_GROUP.RED,
};

export const Blue = Template.bind({});
Blue.args = {
  text: 'Alert message blue color',
  color: AS_COLOR_GROUP.BLUE,
};

export const Green = Template.bind({});
Green.args = {
  text: 'Alert message green color',
  color: AS_COLOR_GROUP.GREEN,
};

export const Orange = Template.bind({});
Orange.args = {
  text: 'Alert message orange color',
  color: AS_COLOR_GROUP.ORANGE,
};

export const Grey = Template.bind({});
Grey.args = {
  text: 'Alert message grey color',
  color: AS_COLOR_GROUP.GREY,
};

export const White = Template.bind({});
White.args = {
  text: 'Alert message white color',
  color: AS_COLOR_GROUP.WHITE,
};
