var path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
const debug = process.env.NODE_ENV !== 'production'

const isProduction = process.env.NODE_ENV === 'production'
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    publicPath: "./",
    css: {
        sourceMap: true, // 开启 CSS source maps
    },
    lintOnSave: false,
    productionSourceMap: false,
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },
    configureWebpack: config => {
        if (isProduction) {
            // 生产环境
            config.plugins.push(
                new CompressionWebpackPlugin({
                    asset: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                }),
                new UglifyJsPlugin({    //代码丑化  移除console
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_debugger: true,
                            drop_console: true,
                        },
                    },
                    sourceMap: false,
                    parallel: true,
                })
            );
            // config.externals = {    //独立出来的文件 不打包到app中 可以启用cdn
            //     'vue': 'Vue',
            //     'vue-router': 'VueRouter',
            //     "echarts":"echarts",
            //     "ol":"ol"
            // }
        } else {
            // 开发环境
        }
    },
    chainWebpack: config => {
        /* ... */
        if (process.env.npm_config_report) {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                .end();
        }

    },
    configureWebpack: {
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
                '~': resolve('node_modules'),
                'Views': resolve('src/views'),
                'Store': resolve('src/store'),
                'Utils': resolve('src/utils'),
                'Config': resolve('src/config'),
                'Routes': resolve('src/routes'),
                'Assets': resolve('src/assets'),
                'Service': resolve('src/service'),
                'Plugins': resolve('src/plugins'),
                'Components': resolve('src/components'),
                'Commons': resolve('src/commons'),
                'Directives': resolve('src/directives')
            }
        }
    },
}

