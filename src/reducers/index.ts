import { combineReducers } from 'redux'

const getAllReducers = () => {
    const ignoreFiles = ['./index.ts']
    const allReducersContext = require.context('./', false, /\.ts$/)
    return allReducersContext
        .keys()
        .filter((id) => !ignoreFiles.includes(id))
        .reduce((pre, nowId) => {
            const reducerNames = nowId.split(/\.\/|.ts$/)[1]
            return {
                ...pre,
                ...{ [reducerNames]: allReducersContext(nowId).default }
            }
        }, {})
}

export default combineReducers(getAllReducers())
