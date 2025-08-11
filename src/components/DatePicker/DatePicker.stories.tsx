import type { Meta, StoryObj } from '@storybook/react';

import { DatePicker } from './index';

// Range here etc
// Maybe convert to mdx

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof DatePicker> = {
  title: 'Example/DatePicker',
  component: DatePicker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // Argtypes are badly inferred sometimes, some need manual configuration
  argTypes: {
    // do range dae & regular date
  },
  args: {
    children: 'DatePicker label',
  },
};

export default meta;
type TStory = StoryObj<typeof meta>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: TStory = {
  args: {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    // type: 'primary',
  },
};
