import { Action } from 'redux'
import { IGlobal } from '@/actions/global'

export interface IStore {
    global: IGlobal
}

export interface IAction<T> extends Action<symbol> {
    payload: Partial<T>
}

export interface IActionDev extends Action<symbol> {
    payload: any
}
