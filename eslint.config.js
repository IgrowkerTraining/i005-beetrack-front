import eslint from '@eslint/js';
import parser from '@typescript-eslint/parser';
import tseslint from '@typescript-eslint/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

// Importamos los globales desde @eslint/js
import globals from 'globals';

export default [
  // eslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['dist', '.eslintrc.cjs'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser, // Reemplaza env: { browser: true }
        ...globals.es2020,  // Reemplaza env: { es2020: true }
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prefer-const': 'error',
      // 'quotes': ['error', 'single'],
      // 'comma-dangle': ['error', 'always-multiline'],
      // 'semi': ['error'],
      // '@typescript-eslint/no-explicit-any': 'error',
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
];