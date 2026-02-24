import baseConfig from '@evrone-erp/eslint-config';
import nextConfig from '@evrone-erp/eslint-config/next';
import storybookConfig from '@evrone-erp/eslint-config/storybook';

export default [
  ...nextConfig,
  ...baseConfig,
  ...storybookConfig,
  {
    ignores: ['dist/**', '*.config.js'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
];
