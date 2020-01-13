import * as React from 'react'
import './index.scss'

interface IState {
    component: undefined | typeof React.Component
}

/**
 * 异步组件
 * @param loadComponent 加载组件回调函数
 */
const AsyncComponent = (loadComponent: () => Promise<{ default: typeof React.Component }>) =>
    class AsyncComponent extends React.Component<{}, IState> {
        state: IState = {
            component: undefined
        }

        componentWillMount() {
            if (this.hasLoadedComponent()) {
                return
            }

            // 动态加载组件
            loadComponent()
                .then((module) => module.default)
                .then((component) => {
                    this.setState({ component })
                })
                .catch((err: Error) => {
                    console.error(`Cannot load component in <AsyncComponent />`)
                    throw err
                })
        }

        // 是否已经把组件加载完成
        hasLoadedComponent() {
            return this.state.component !== undefined
        }

        render() {
            const { component } = this.state

            if (component) {
                const OriginalComponent = component
                // 如果加载成功，渲染组件
                return <OriginalComponent {...this.props} />
            } else {
                return null
            }
        }
    }

export default AsyncComponent
