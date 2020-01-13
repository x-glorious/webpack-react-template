const merge = require('webpack-merge')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const base = require('./webpack.base.js')

module.exports = merge(base, {
    mode: 'production',
    plugins: [
        // 清楚之前生成的代码
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.resolve(__dirname, '../public/js'),
                path.resolve(__dirname, '../public/css')
            ]
        }),
        new MiniCssExtractPlugin({
            // css文件放到css 目录下
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[name].[hash].chunks.css'
        }),
        //  开启代码压缩
        new UglifyJSPlugin({
            // 开启缓存
            cache: path.resolve(__dirname, '../.cache'),
            // 开启多进程，数目为3
            parallel: 3,
            // 压缩，不考虑可读性
            sourceMap: false,
            uglifyOptions: {
                output: {
                    // 去掉注释
                    comments: false,
                    // 去掉 空格 和 tab
                    beautify: false
                }
            }
        })
    ],
    stats: {
        // 显示颜色
        colors: true
    }
})
