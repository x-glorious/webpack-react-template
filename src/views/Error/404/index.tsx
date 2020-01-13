import React from 'react'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import styles from './index.scss'

class Error404 extends React.Component<RouteComponentProps, {}> {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <p className={styles.title}>Oops!!</p>
                    <div className={styles.body}>
                        <div className={styles.leftArm} />
                        <div className={styles.face}>
                            <div className={styles.upper}>
                                <span className={styles.upperElement}>4</span>
                                <span className={styles.upperElement}>0</span>
                                <span className={styles.upperElement}>4</span>
                            </div>
                            <div className={styles.mouth} />
                        </div>
                        <div className={styles.rightArm} />
                    </div>
                    <p className={styles.tooltip}>
                        maybe you want to go{' '}
                        <span
                            className={styles.backButton}
                            onClick={() => this.props.history.goBack()}
                        >
                            back
                        </span>
                    </p>
                </div>
            </div>
        )
    }
}

export default withRouter(Error404)
