import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, Action } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import App from '@/views/App'
import reducers from '@/reducers'

const initState = {}
let enhancer = applyMiddleware(thunk)

// dev 环境使用 chrome redux 插件
if (CHICKEN.ENV === 'dev') {
    // actions 转换
    const actionSanitizer = function<T extends Action>(action: T, id: number): T {
        const des = action.type.toString()
        return {
            ...action,
            type: des
        }
    }

    const devTools = composeWithDevTools({
        actionSanitizer
    })
    enhancer = devTools(enhancer)
}

export const store = createStore(reducers, initState, enhancer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
