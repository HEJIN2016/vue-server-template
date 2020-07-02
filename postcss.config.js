/*
 * @Author: hejin
 */
const devMode = process.env.NET_ENV === 'development'
module.exports = {
  sourceMap: devMode,
  plugins: (loader) => [
    require('postcss-preset-env')({}),
    require('postcss-flexbugs-fixes')({}),
    ...(!devMode ? [require('cssnano')({})] : [])
  ]
}
