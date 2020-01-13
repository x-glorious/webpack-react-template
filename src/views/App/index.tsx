import * as React from 'react'
import appRouter from '@/routers/app'
import styles from './index.scss'

class App extends React.Component<{}, {}> {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.content}>{appRouter}</div>
            </div>
        )
    }
}

export default App
