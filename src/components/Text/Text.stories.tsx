import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    docs: {
      description: {
        component: 'Компонент для отображения текста с различными стилями',
      },
    },
  },
};

export default meta;
type TStory = StoryObj<typeof meta>;

export const RegularText: TStory = {
  args: {
    lh: '22',
    children: 'Пример текста',
  },
  parameters: {
    docs: {
      description: {
        story: `
\`\`\`css
font-weight: 400;
font-size: 14px;
line-height: 22px;
color: #262626;
\`\`\``,
      },
    },
  },
};

export const TaskLink: TStory = {
  args: {
    underline: true,
    color: '#0B68FF',
    fw: '500',
    children: 'Пример ссылки',
  },
  parameters: {
    docs: {
      description: {
        story: `
\`\`\`css
font-weight: 500;
font-size: 14px;
line-height: 17px;
color: #0B68FF;
text-decoration-line: underline;
\`\`\``,
      },
    },
  },
};

export const BoldText: TStory = {
  args: {
    fw: '700',
    children: 'Жирный текст',
  },
  parameters: {
    docs: {
      description: {
        story: `
\`\`\`css
font-weight: 700;
font-size: 14px;
line-height: 17px;
color: #262626;
\`\`\``,
      },
    },
  },
};

export const WeekDate: TStory = {
  args: {
    fw: '500',
    fs: '28',
    lh: '34',
    children: '24 - 30 июля',
  },
  parameters: {
    docs: {
      description: {
        story: `
\`\`\`css
font-weight: 500;
font-size: 28px;
line-height: 34px;
color: #262626;
\`\`\``,
      },
    },
  },
};

export const ModalTitle: TStory = {
  args: {
    fw: '700',
    fs: '16',
    lh: '19',
    children: 'Заголовок модального окна',
  },
  parameters: {
    docs: {
      description: {
        story: `
\`\`\`css
font-weight: 700;
font-size: 16px;
line-height: 19px;
color: #262626;
\`\`\``,
      },
    },
  },
};
