import js from '@eslint/js'
import globals from 'globals'
import {defineConfig} from 'eslint/config'
import prettier from 'eslint-plugin-prettier'
import securityPlugin from 'eslint-plugin-security'
import unicornPlugin from 'eslint-plugin-unicorn'

export default defineConfig([
  securityPlugin.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
      prettier,
      unicornPlugin,
    },
    extends: ['js/recommended'],
    languageOptions: {globals: globals.node},
    rules: {
      'func-style': ['error', 'expression'],
      'no-restricted-syntax': ['off', 'ForOfStatement'],
      'no-console': ['error'],
      'prefer-template': 'error',
      quotes: ['error', 'single', {avoidEscape: true}],
      'prettier/prettier': [
        1,
        {
          endOfLine: 'lf',
          printWidth: 200,
          semi: false,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'es5',
        },
      ],
    },
  },
])