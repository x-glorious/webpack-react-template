import * as React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Error404 from '@/views/Error/404'

/**
 * 错误页面全部使用同步加载，从一开始就打包进入main.js
 */
export default (
    <Switch>
        <Route exact path="/error/404" component={Error404} />
        {/* 找不到页面，重新定向到 404 错误 404 页面*/}
        <Route path="*">
            <Redirect to="/error/404"></Redirect>
        </Route>
    </Switch>
)
