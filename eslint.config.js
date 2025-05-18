import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { 
      globals: {
        ...globals.node,
        describe: 'readonly', // 添加 describe 全局变量
        it: 'readonly'        // 添加 it 全局变量
      } 
    },
    rules: {
      'no-unused-vars': ['error', { args: 'none' }],
      quotes: ['error', 'single'],
      indent: ['error', 2]
    }
  },
  pluginJs.configs.recommended,
];