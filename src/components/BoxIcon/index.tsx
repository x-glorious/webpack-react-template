import * as React from 'react'
import styles from './index.scss'

class BoxIcon extends React.Component<{}, {}> {
    render() {
        return (
            <div className={styles.scene}>
                <div className={styles.cube}>
                    <div className={styles.front} />
                    <div className={styles.back} />
                    <div className={styles.left} />
                    <div className={styles.right} />
                    <div className={styles.top} />
                    <div className={styles.bottom} />
                </div>
            </div>
        )
    }
}

export default BoxIcon
