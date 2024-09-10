// 启用隐藏的全局变量规则
import globals from 'globals'
// JS-EsLint 规则集
import jsEslint from '@eslint/js'
// TS-EsLint 规则集
import tsEslint from 'typescript-eslint'
// eslint-plugin-prettier 合并项目下的prettier.config.js文件配置，用于格式化代码
import eslintConfigPrettier from 'eslint-config-prettier'

// 这里我们既然用到了typescript-eslint这个插件，那么我们还可以用tseslint.config这个函数，来让配置有文件有代码提示，避免写错。
export default [
	// 忽略文件
	{
		ignores: ['node_modules', 'dist']
	},
	// js-eslint 规则集 （eslint 默认只支持 js）
	jsEslint.configs.recommended,
	// ts-eslint 规则集
	...tsEslint.configs.recommended,

	/**
	 * 在下面定义的规则 会 覆盖 上面的默认规则
	 */

	/**
	 * javascript 规则
	 */
	{
		files: ['**/*.{js,mjs,cjs}'],
		rules: {
			'no-console': 'error'
		}
	},

	/**
	 * typescript 规则
	 */
	{
		files: ['**/*.{ts,,mts,cts,tsx}'],
		languageOptions: {
			parser: tsEslint.parser,
			parserOptions: {
				project: 'tsconfig.json',
				sourceType: 'module'
			}
		},
		// 自定义typescript规则， 会覆盖上面的默认规则
		rules: {
			'@typescript-eslint/no-explicit-any': 'off'
		}
	},

	// 启用浏览器全局变量
	{
		languageOptions: {
			globals: {
				// 例如：你可以在任何浏览器环境执行alert()，但是你在nodejs环境中执行就会报错，nodejs中并没有该方法。
				// 这里只是告知eslint这些是全局变量，eslint便会去掉这些报错。
				...globals.browser

				// 追加一些自定义全局变量
				// wx: true
			}
		}
	},

	// 以下在不同项目中可以定制不同规则集
	// React 规则集
	// Vue 规则集

	/**
	 * prettier 配置，将其放到数组的最后一项，以便 eslint-config-prettier 有机会覆盖其他配置
	 * 会合并根目录下的prettier.config.js 文件
	 */
	eslintConfigPrettier
]
