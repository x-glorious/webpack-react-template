const path = require('path')

module.exports = function(api) {
    api.cache(true)

    const presets = [
        [
            '@babel/preset-env',
            // 只支持 市场占有率 > 0.25% 的浏览器 做兼容处理
            {
                targets: '> 0.25%, not dead'
            }
        ],
        // 支持 ts
        '@babel/preset-typescript',
        // 支持 react
        '@babel/preset-react'
    ]
    const plugins = [
        // 转换 ts 语言
        ['@babel/plugin-transform-typescript', { allowNamespaces: true }],
        // class 转换
        '@babel/proposal-class-properties',
        // 支持 解构
        '@babel/plugin-proposal-object-rest-spread',
        // 减少冗余代码，使用Module构建
        [
            '@babel/plugin-transform-runtime',
            {
                useESModules: true
            }
        ],
        // 支持动态import()
        '@babel/plugin-syntax-dynamic-import',
        'module-resolver'
    ]

    return {
        presets,
        plugins
    }
}
