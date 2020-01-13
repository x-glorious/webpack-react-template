const merge = require('webpack-merge')
const base = require('./webpack.base.js')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const Settings = require('./settings')

module.exports = merge(base, {
    mode: 'development',
    devtool: 'source-map',
    watch: true,
    watchOptions: {
        // 不监听的文件或文件夹，支持正则匹配
        ignored: /node_modules/,
        // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
        aggregateTimeout: 300,
        // 每隔1000毫秒询问一次
        poll: 1000
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: ['You application is running here http://localhost:' + Settings.PORT],
                notes: ['----------Chicken-----------']
            },
            // should the console be cleared between each compilation?
            // default is true
            clearConsole: true
        })
    ],
    devServer: {
        // 开启调试热更新
        hot: true,
        // 设置调试端口 , 设置一个没人会用的端口
        port: Settings.PORT,
        contentBase: './public/',
        // 开启安静模式，warning 和 报错由其他的 插件来显示
        quiet: true
    },
    stats: {
        // 显示颜色
        colors: true
    }
})
