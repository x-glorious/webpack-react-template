interface IChicken {
    /**
     * 环境变量名字
     * <dev -> 开发环境>
     * <prod -> 正式环境>
     */
    ENV: 'prod' | 'dev'
}

declare const CHICKEN: IChicken
