// 启用隐藏的全局变量规则
import globals from "globals";
// JS-EsLint 规则集
import jsEslint from "@eslint/js";
// TS-EsLint 规则集
import tsEslint from "typescript-eslint";
// @stylistic/eslint-plugin 提供更多的typescript和JavaScript的语法风格规则
import stylistic from "@stylistic/eslint-plugin"
// eslint-plugin-prettier 合并项目下的prettier.config.js文件配置，用于格式化代码
import eslintPrettier from "eslint-plugin-prettier"


// 这里我们既然用到了typescript-eslint这个插件，那么我们还可以用tseslint.config这个函数，来让配置有文件有代码提示，避免写错。
export default [
  // 忽略文件
  {
    ignores: [
      'node_modules',
      'dist',
    ],
  },
  // js-eslint 规则集 （eslint 默认只支持 js）
  jsEslint.configs.recommended,
  // ts-eslint 规则集
  ...tsEslint.configs.recommended,


  // 提供更多的typescript和JavaScript的语法风格规则
  stylistic.configs.customize({
    // 缩进
    indent: 2,
    // 引号
    quotes: 'single',
    // 是否分号
    semi: false,
    // 使用哪种大括号样式
    braceStyle: '1tbs',
    // 箭头函数
    arrowParens: 'always',
    // 是否在大括号周围要求空格
    blockSpacing: true,
  }),

  /**
   * 在下面定义的规则 会 覆盖 上面的默认规则
   */

  /**
   * javascript 规则
   */
  {
    files: ['**/*.{js,mjs,cjs}'],
    rules: {
      'no-console': 'error',
    }
  },


  // 启用浏览器全局变量
  {
    languageOptions: {
    globals: {
      // 例如：你可以在任何浏览器环境执行alert()，但是你在nodejs环境中执行就会报错，nodejs中并没有该方法。
      // 这里只是告知eslint这些是全局变量，eslint便会去掉这些报错。
      ...globals.browser,

      // 追加一些自定义全局变量
      // wx: true
    }
   }
  },

   /**
   * typescript 规则
   */
  {
    files: ["**/*.{ts}"],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: 'tsconfig.json',
        sourceType:'module'
      }
    },
    // 自定义typescript规则， 会覆盖上面的默认规则
    rules: {}
  },

  // 以下在不同项目中可以定制不同规则集
  // React 规则集
  // Vue 规则集
  // TSX 规则集

   /**
  * prettier 配置
  * 会合并根目录下的prettier.config.js 文件
  */
   eslintPrettier.configs.recommended,

]
