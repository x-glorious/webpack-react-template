const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const Settings = require('./settings')

module.exports = {
    // JavaScript 执行入口文件
    entry: './src/root.tsx',
    output: {
        // js文件放到js目录下
        filename: 'js/main.[hash].js',
        // 输出文件都放到 public 目录下
        path: path.resolve(__dirname, '../public'),
        chunkFilename: 'js/chunks/[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx?)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    'eslint-loader'
                ],
                exclude: /node_modules/
            },
            // css 规则，这里主要是用来加载一些三方库，或者处理好的css，所以无需其他额外的处理，直接莽就好
            {
                test: /\.css$/,
                use: [
                    // 使用 css 分离
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // 只有正式环境才会打开压缩 css
                            minimize: process.env.CHICKEN_ENV === 'prod'
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    // 使用 css 分离
                    {
                        // 开发环境使用 'style-loader',这样热更新才能有效
                        loader:
                            process.env.CHICKEN_ENV === 'dev'
                                ? 'style-loader'
                                : MiniCssExtractPlugin.loader
                    },
                    // 使用 css 模块化 ts 支持
                    {
                        loader: '@teamsupercell/typings-for-css-modules-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // 开启模块化
                            modules: {
                                mode: 'local',
                                localIdentName:
                                    // 根据 环境 判断 css 标识符生成模式
                                    // 开发环境将把 local -> 原来的className，path -> 路径等等带上
                                    // 非开发环境，就直接使用hash码
                                    process.env.CHICKEN_ENV === 'dev'
                                        ? '[path][name]__[local]--[hash:base64:5]'
                                        : '[hash:base64]'
                            },
                            // 开启 url 功能，可以使用相对、绝对、网络路径
                            url: true
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        fallback: 'file-loader',
                        // file-loader 输出的名字
                        name: 'img/[name].[hash:8].[ext]',
                        // 最大限度 23KB，大于这个，使用file-loader
                        limit: 1024 * 23
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        // 所有的三方模块
        modules: [path.resolve(__dirname, '../node_modules')],
        alias: {
            '@': path.resolve(__dirname, '../src/')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../template/index.html'),
            favicon: path.resolve(__dirname, '../template/favicon.ico'),
            // 加入 dll version 参数传递到 模板里面
            dllVersion: Settings.DLL_VERSION
        }),
        new webpack.DefinePlugin({
            'CHICKEN.ENV': JSON.stringify(process.env.CHICKEN_ENV)
        }),
        // 告诉 Webpack 使用了哪些动态链接库
        new DllReferencePlugin({
            // 描述 react 动态链接库的文件内容
            manifest: path.resolve(
                __dirname,
                `../public/library/chicken.${Settings.DLL_VERSION}.manifest.json`
            )
        }),
        new ForkTsCheckerWebpackPlugin({
            tsconfig: path.resolve(__dirname, '../tsconfig.json'),
            async: false
        })
    ],
    optimization: {
        // 拆分 runtime (webpack 的一些运行时代码和模块清单数据啥啥啥的)包
        // 把所有的 runtime 代码生成为一个 独立 的chunk
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'initial',
            // 最大异步请求数目 3 个 chunk
            maxAsyncRequests: 3,
            // 页面初始化最大入口 chunk 引入数目
            maxInitialRequests: 3,
            // 小于 23 kb 不会独立成为一个包分出来，而是那里引用了就往哪里打，当然，异步Import没办法，就得单独打个包
            minSize: 1024 * 23,
            // 模块最少都要被引用 1次，才会有独立成 chunk 的资格
            minChunks: 1,
            // 链接符
            automaticNameDelimiter: '~',
            // 使用名字
            name: true,
            // 缓存组
            cacheGroups: {
                // 公共三方包提取
                vendors: {
                    // 只有 node_modules 里面的 才会被缓存为 venders
                    test: /[\\/]node_modules[\\/]/
                },
                // 公共自己写的模块提取
                chickens: {
                    // 一个 模块只有被 至少引用两次以上，才会被机会 打成一个附带 normal 前缀的 公共包（当然，你得正常import，import()异步加载会直接生成一个chunk）
                    minChunks: 2
                }
            }
        }
    }
}
