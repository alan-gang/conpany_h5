'use strict'

// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8084,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/dscagamesclient': {
            target: 'http://192.168.169.49:9901/',
            changeOrigin: true,
            pathRewrite: {
              '^/dscagamesclient': ''
            }
        },
        '/xy49': {
            target: 'http://192.168.169.49:9901/',
            changeOrigin: true,
            pathRewrite: {
              '^/xy49': ''
            }
        },
        '/xytest': {
            target: 'https://www.xy-test.net/',
            changeOrigin: true,
            pathRewrite: {
              '^/xytest': ''
            }
        },
        '/xyjs': {
            target: 'http://192.168.169.71:8080/',
            changeOrigin: true,
            pathRewrite: {
              '^/xyjs': ''
            }
        },
        '/xyst': {
            target: 'http://192.168.169.70:8080/',
            changeOrigin: true,
            pathRewrite: {
              '^/xyst': ''
            }
        },
        '/cookie': {
            target: 'http://192.168.169.126:3000/',
            changeOrigin: true,
            pathRewrite: {
              '^/.*': ''
            }
        },
        '/xy_activity': {
            target: 'http://192.168.169.49/',
            changeOrigin: true,
            pathRewrite: {
              '^/xy_activity': '/xy_activity'
            }
        },
        '/pt_egame': {
            target: 'http://192.168.169.49/',
            changeOrigin: true,
            pathRewrite: {
              '^/pt_egame': '/pt_egame'
            }
        },
        '/lg_egame': {
            target: 'http://192.168.169.49/',
            changeOrigin: true,
            pathRewrite: {
              '^/lg_egame': '/lg_egame'
            }
        },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
