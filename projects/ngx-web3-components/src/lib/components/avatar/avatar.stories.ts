import { CommonModule } from '@angular/common';

import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { AvatarComponent } from './avatar.component';

export default {
  title: 'components/Avatar',
  component: AvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
      ],
    }),
  ],
} as Meta;

const Template: Story<AvatarComponent> = (args: AvatarComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
};

export const WithImage = Template.bind({});
WithImage.args = {
  src: 'https://static.toiimg.com/thumb/msid-78377896,imgsize-134939,width-800,height-600,resizemode-75/78377896.jpg',
};

export const CustomHeight = Template.bind({});
CustomHeight.args = {
  ...WithImage.args,
  size: 48,
};
