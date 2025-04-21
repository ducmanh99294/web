import React from 'react'
import styles from '../../../styles/dashboard/NotFound.module.css'
const NotFound = () => {
    return (
        <div className={styles.notFoundContainer}>
            <div className={styles.notFound}>
                <h1>404</h1>
                <h2>Lỗi ròio</h2>
            </div>
        </div>
    )
}

export default NotFound
