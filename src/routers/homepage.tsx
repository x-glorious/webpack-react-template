import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import AsyncComponent from '@/components/AsyncComponent'

export default (
    <Switch>
        <Route
            exact
            path="/home/test"
            component={AsyncComponent(() => import(/* webpackChunkName: "test" */ '@/views/Test'))}
        />
    </Switch>
)
