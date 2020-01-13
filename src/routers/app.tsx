import * as React from 'react'
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import AsyncComponent from '@/components/AsyncComponent'
import Error from '@/views/Error'

export default (
    <HashRouter>
        <Switch>
            <Route
                exact
                path="/"
                component={AsyncComponent(() =>
                    import(/* webpackChunkName: "homepage" */ '@/views/Homepage')
                )}
            />
            <Route
                path="/home"
                component={AsyncComponent(() =>
                    import(/* webpackChunkName: "homepage" */ '@/views/Homepage')
                )}
            />
            {/* Error 页面不使用异步加载，而是直接打包到main chunk 里面，只要正确加载了一开始的main.js，那么，就会拥有报错功能*/}
            <Route path="/error" component={Error} />
            {/* 找不到页面，重新定向到 404 错误 404 页面*/}
            <Route path="*">
                <Redirect to="/error/404"></Redirect>
            </Route>
        </Switch>
    </HashRouter>
)
