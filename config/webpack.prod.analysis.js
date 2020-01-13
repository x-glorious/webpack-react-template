const merge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const prod = require('./webpack.prod.js')

/**
 * 生产环境 + 生成分析报告
 */
module.exports = merge(prod, {
    mode: 'production',
    plugins: [
        // 打包工具分析
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            analyzerHost: '127.0.0.1',
            analyzerPort: 22444,
            reportFilename: '../analysis/report.html',
            defaultSizes: 'parsed',
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: '../analysis/stats.json',
            statsOptions: null,
            logLevel: 'info'
        })
    ]
})
