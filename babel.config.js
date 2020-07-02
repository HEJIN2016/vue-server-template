// syntax-dynamic-import 解析import()动态导入语法
module.exports = {
  plugins: ['@babel/transform-runtime', '@babel/syntax-dynamic-import'],
    presets: [
      [
        '@babel/env',
          {
            modules: false,
            loose: true,
          },
      ]
    ]
}
