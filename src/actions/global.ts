import { IAction } from '@/actions/types'

export interface IGlobal {
    testForAction: string
}

export const SET_TEST = Symbol('Global Actions test')
export const setTestA = (): IAction<IGlobal> => ({
    type: SET_TEST,
    payload: {
        testForAction: 'test success'
    }
})
