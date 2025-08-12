import type { Meta, StoryObj } from '@storybook/react';

import { TextArea } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TextArea> = {
  title: 'Example/TextArea',
  component: TextArea,
  argTypes: {
    placeholder: { control: 'text' },
  },
};

export default meta;
type TStory = StoryObj<typeof meta>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: TStory = {
  args: {
    primary: true,
    label: 'TextArea',
  },
};
