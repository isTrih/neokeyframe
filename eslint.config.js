import unocss from '@unocss/eslint-config/flat'
module.exports = {
  unocss,
  // 项目代码运行的环境
  env: {
    // 浏览器环境
    browser: true,
    // es 模块化规范 import/export
    es2021: true,
    // node 环境
    node: true,
    // jest 测试环境
    jest: true,
  },
  // 指定解析语法的解析器
  // parser 的作用是将我们写的代码转换为 ESTree（AST）
  // ESLint 会对 ESTree 进行校验
  parser: 'vue-eslint-parser',
  // 优先级低于 parse 的语法解析器配置
  parserOptions: {
    // es 模块化版本
    ecmaVersion: 'latest',
    // 源码类型为模块化语法，使用 esm 模块化规范
    sourceType: 'module',
    // ts eslint 的解析器
    parser: '@typescript-eslint/parser',
    // jsx tsx 语法规则
    jsxPragma: 'React',
    // ecma 特性，允许使用 jsx、tsx
    ecmaFeatures: {
      tsx: true,
      jsx: true,
    },
  },
  // 本项目继承的 eslint 规则
  extends: [
    // eslint 推荐的规则
    'eslint:recommended',
    // vue3 语法规则
    'plugin:vue/vue3-essential',
    // typescript-eslint 推荐的规则
    'plugin:@typescript-eslint/recommended',
    // prettier 推荐的规则
    // 继承使用 eslint 规则插件时，插件名前缀 eslint-config-, 可省略
    'plugin:prettier/recommended',
  ],
  // 全局自定义的宏，这样在源文件中使用就不会报错或者警告
  // 在 Vue3 的 setup 中，defineProps defineEmits 等我们是可以直接使用的，
  // 无需 import 引入，进行全局自定义宏，这样在源文件中使用就不会报错或者警告
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefault: 'readonly',
  },
  // 插件
  // 配置使用插件时，插件名称的前缀 eslint-plugin-, 可省略
  // vue 官方提供的 ESLint 插件 eslint-plugin-vue 中提供了 parser 和 rules，
  // parser 为 vue-eslint-parser，配置使用写在上面的 parser 字段，
  // rules 选择合适的规则写在 extends 字段里
  plugins: ['vue', '@typescript-eslint'],
  // 设置
  settings: {
    // 对于 import 导入模块的解析配置
    "import/resolver": {
      // 配置 import 导入模块时使用的别名映射
      alias: {
        map: [
          ['@', '.'],
          ['@@', '.'],
          ['~', '.'],
          ['~~', '.'],
          ['assets', './assets'],
          ['public', './public'],
          ['#components', './components'],
          ['nuxt', './node_modules/.pnpm/nuxt@3.11.2_@unocss+reset@0.58.9_floating-vue@5.2.2_typescript@5.4.4_unocss@0.58.9_vite@5.2.8_vue-tsc@2.0.10/node_modules/nuxt'],
        ],
        // 告诉 resolver-alias 有哪些后缀的文件要解析
        // 解决：Unable to resolve path to module
        extensions: ['.ts', '.js', 'tsx', 'jsx', 'json', 'vue']
      },
    },
  },
  // 自定义 eslint 规则
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint（https://eslint.bootcss.com/docs/rules/）
    // 要求使用 let 或 const 而不是 var
    'no-var': 'error',
    // 不允许多个空行，最多一个
    'no-multiple-empty-lines': ['warn', {max: 1}],
    // 生产环境下不允许 console debugger
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁止空余的多行
    'no-unexpected-multiline': 'error',
    // 禁止不必要的转义字符
    'no-useless-escape': 'off',
    // 数组和对象键值对最后一个逗号，
    // never参数：不能带末尾的逗号,
    // always参数：必须带末尾的逗号，
    // always-multiline：多行模式必须带逗号，单行模式不能带逗号
    'comma-dangle': ['warn', "always-multiline"],
    // 要求对象字面量属性名称用引号括起来
    'quote-props': 'off',
    // 强制使用一致的反勾号、双引号或单引号
    // 允许使用模板字符串
    'quotes': ["error", "single", {"avoidEscape": true, "allowTemplateLiterals": true}],

    // typeScript (https://typescript-eslint.io/rules)
    // 禁止定义未使用的变量
    '@typescript-eslint/no-unused-vars': 'error',
    // 禁止使用 @ts-ignore
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    // 禁止使用 any 类型
    '@typescript-eslint/no-explicit-any': 'error',
    // 禁止使用 postfix 运算符的非 null 断言。
    // 如 example.property!.includes('baz');
    '@typescript-eslint/no-non-null-assertion': 'off',
    // 禁止使用自定义 TypeScript 模块和命名空间。
    '@typescript-eslint/no-namespace': 'off',
    // 语句结尾带分号
    '@typescript-eslint/semi': 'off',
    // 解决 vite.config.ts 的引入报错
    'import/no-extraneous-dependencies': 'off',
    // import 时后缀名，可以省略
    'import/extensions': 'off',

    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
    // 要求组件名称始终为 “-” 链接的单词
    'vue/multi-word-component-names': 'off',
    // 防止 <script setup> 使用的变量 <template> 被标记为未使用
    'vue/script-setup-uses-vars': 'error',
    // 不允许组件 prop 的改变
    'vue/no-mutating-props': 'error',
    // 对模板中的自定义组件强制执行属性命名样式
    'vue/attribute-hyphenation': 'off',
    // 解决按需导入 ElMessage 未定义的问题
    'no-undef': 'off',
  },
}
