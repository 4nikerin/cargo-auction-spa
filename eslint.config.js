import js from '@eslint/js';
import boundaries from 'eslint-plugin-boundaries';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist', 'src/shared/api/generated/**/*']),

  {
    files: ['**/*.{ts,tsx}'],

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintPluginPrettierRecommended,
    ],

    plugins: {
      boundaries,
    },

    settings: {
      'boundaries/elements': [
        {
          type: 'app',
          pattern: 'src/app/**',
        },
        {
          type: 'pages',
          pattern: 'src/pages/**',
        },
        {
          type: 'widgets',
          pattern: 'src/widgets/**',
        },
        {
          type: 'features',
          pattern: 'src/features/**',
        },
        {
          type: 'entities',
          pattern: 'src/entities/**',
        },
        {
          type: 'shared',
          pattern: 'src/shared/**',
        },
      ],
    },

    rules: {
      ...boundaries.configs.recommended.rules,

      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            {
              from: { element: { type: 'app' } },
              allow: {
                to: {
                  element: {
                    type: [
                      'pages',
                      'widgets',
                      'features',
                      'entities',
                      'shared',
                    ],
                  },
                },
              },
            },
            {
              from: { element: { type: 'pages' } },
              allow: {
                to: {
                  element: {
                    type: ['widgets', 'features', 'entities', 'shared'],
                  },
                },
              },
            },
            {
              from: { element: { type: 'widgets' } },
              allow: {
                to: {
                  element: {
                    type: ['features', 'entities', 'shared'],
                  },
                },
              },
            },
            {
              from: { element: { type: 'features' } },
              allow: {
                to: {
                  element: {
                    type: ['entities', 'shared'],
                  },
                },
              },
            },
            {
              from: { element: { type: 'entities' } },
              allow: {
                to: {
                  element: {
                    type: ['shared'],
                  },
                },
              },
            },
            {
              from: { element: { type: 'shared' } },
              allow: {
                to: {
                  element: {
                    type: ['shared'],
                  },
                },
              },
            },
          ],
        },
      ],

      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/pages/**/ui/**',
                '@/pages/**/model/**',
                '@/pages/**/lib/**',
                '@/pages/**/api/**',

                '@/widgets/**/ui/**',
                '@/widgets/**/model/**',
                '@/widgets/**/lib/**',
                '@/widgets/**/api/**',

                '@/features/**/ui/**',
                '@/features/**/model/**',
                '@/features/**/lib/**',
                '@/features/**/api/**',

                '@/entities/**/ui/**',
                '@/entities/**/model/**',
                '@/entities/**/lib/**',
                '@/entities/**/api/**',
              ],
              message:
                'Use public API import from slice index.ts, or relative import inside the same slice.',
            },
            {
              group: [
                '../app/**',
                '../../app/**',
                '../../../app/**',
                '../../../../app/**',

                '../pages/**',
                '../../pages/**',
                '../../../pages/**',
                '../../../../pages/**',

                '../widgets/**',
                '../../widgets/**',
                '../../../widgets/**',
                '../../../../widgets/**',

                '../features/**',
                '../../features/**',
                '../../../features/**',
                '../../../../features/**',

                '../entities/**',
                '../../entities/**',
                '../../../entities/**',
                '../../../../entities/**',

                '../shared/**',
                '../../shared/**',
                '../../../shared/**',
                '../../../../shared/**',
              ],
              message:
                'Use @ alias for imports between FSD layers. Use relative imports only inside the same slice.',
            },
          ],
        },
      ],
    },

    languageOptions: {
      globals: globals.browser,
    },
  },
]);
