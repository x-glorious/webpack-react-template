declare namespace IndexScssModule {
    export interface IIndexScss {
        arm: string
        backButton: string
        body: string
        container: string
        content: string
        face: string
        leftArm: string
        mouth: string
        rightArm: string
        title: string
        tooltip: string
        upper: string
        upperElement: string
    }
}

declare const IndexScssModule: IndexScssModule.IIndexScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: IndexScssModule.IIndexScss
}

export = IndexScssModule
