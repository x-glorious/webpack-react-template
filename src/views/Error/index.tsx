import React from 'react'
import styles from './index.scss'
import errorRouter from '@/routers/error'

class Error extends React.Component<{}, {}> {
    render() {
        return <div className={styles.container}>{errorRouter}</div>
    }
}

export default Error
