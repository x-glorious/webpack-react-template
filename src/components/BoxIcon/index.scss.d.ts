declare namespace IndexScssModule {
    export interface IIndexScss {
        back: string
        bottom: string
        cube: string
        'cube-rotate': string
        front: string
        left: string
        right: string
        scene: string
        top: string
    }
}

declare const IndexScssModule: IndexScssModule.IIndexScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: IndexScssModule.IIndexScss
}

export = IndexScssModule
