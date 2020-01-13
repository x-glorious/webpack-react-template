const path = require('path')
const DllPlugin = require('webpack/lib/DllPlugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Settings = require('./settings')

const VERSION = Settings.DLL_VERSION

module.exports = {
    mode: 'production',
    // JavaScript 执行入口文件
    entry: {
        chicken: [
            'react',
            'react-dom',
            'react-router-dom',
            'classnames',
            'redux-thunk',
            'redux',
            'react-redux',
            'tslib'
        ]
    },
    output: {
        filename: `[name].${VERSION}.dll.js`,
        // dll 输出文件都放到 public/library 目录下
        path: path.resolve(__dirname, '../public/library'),
        // 存放动态链接库的全局变量名称，例如对应 react 来说就是 _dll_react
        library: `_dll_[name]_${VERSION}`
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../public/library')]
        }),
        // 接入 DllPlugin
        new DllPlugin({
            // 动态链接库的全局变量名称，需要和 output.library 中保持一致
            name: `_dll_[name]_${VERSION}`,
            // 描述动态链接库的 manifest.json 文件输出时的文件名称
            path: path.join(__dirname, `../public/library/[name].${VERSION}.manifest.json`)
        })
    ]
}
