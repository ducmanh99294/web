import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';
import styles from '../styles/PageNotFound.module.css';
import Layout from '../Layout/Layout';

const PageNotFound = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <FaExclamationTriangle size={80} color="#dc3545" />
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Trang không tìm thấy</h2>
        <p className={styles.message}>
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <button className={styles.button}>
          <Link to="/" className={styles.link}>
            <FaHome size={18} />
            Quay về trang chủ
          </Link>
        </button>
      </div>
    </Layout>
  );
};

export default PageNotFound;