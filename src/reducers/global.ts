import { IAction } from '@/actions/types'
import { IGlobal, SET_TEST } from '@/actions/global'

const initState = {}

export default (state = initState, action: IAction<IGlobal>) => {
    const { type, payload = {} } = action

    const simpleReducerType = [SET_TEST]

    if (simpleReducerType.includes(type)) {
        return {
            ...state,
            ...payload
        }
    }

    return state
}
