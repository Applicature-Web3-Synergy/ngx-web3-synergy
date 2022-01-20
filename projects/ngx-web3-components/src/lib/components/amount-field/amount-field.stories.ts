import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { DigitOnlyModule } from '@uiowa/digit-only';

import { AmountFieldComponent } from './amount-field.component';

export default {
  title: 'components/Amount Field',
  component: AmountFieldComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DigitOnlyModule,
      ],
    }),
  ],
} as Meta;

const Template: Story<AmountFieldComponent> = (args: AmountFieldComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: "Field Label",
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  ...WithLabel.args,
  placeholder: "Enter",
};

export const WithHint = Template.bind({});
WithHint.args = {
  ...WithPlaceholder.args,
  hintTemplate: "This is a message",
};

export const WithPrefix = Template.bind({});
WithPrefix.args = {
  ...WithHint.args,
  prefix: "USDT",
};

export const WithSuffix = Template.bind({});
WithSuffix.args = {
  ...WithHint.args,
  suffix: "USDT",
};

export const WithPrefixSuffix = Template.bind({});
WithPrefixSuffix.args = {
  ...WithPrefix.args,
  ...WithSuffix.args,
};

export const WithMax = Template.bind({});
WithMax.args = {
  ...WithHint.args,
  suffix: "USDT",
  max: "14.151617",
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...WithHint.args,
  suffix: "USDT",
  max: "14.151617",
  disabled: true,
};


export const WithErrors = Template.bind({});
WithErrors.args = {
  ...WithHint.args,
  suffix: "USDT",
  max: "14.151617",
  errors: ['This is an error message'],
};
