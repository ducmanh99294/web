import React from 'react';
import styles from '../styles/Footer.module.css'; // Create a new CSS module for the footer

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.about}>
          <h3 className={styles.title}>Về chúng tôi</h3>
          <p className={styles.description}>
            Chúng tôi cung cấp những sản phẩm chất lượng cao với giá cả hợp lý. Đặt hàng nhanh chóng và dễ dàng!
          </p>
        </div>
        <div className={styles.support}>
          <h3 className={styles.title}>Hỗ trợ</h3>
          <ul className={styles.supportList}>
            <li><a href="#" className={styles.link}>Câu hỏi thường gặp</a></li>
            <li><a href="#" className={styles.link}>Chính sách đổi trả</a></li>
            <li><a href="#" className={styles.link}>Chính sách bảo mật</a></li>
          </ul>
        </div>
        <div className={styles.followUs}>
          <h3 className={styles.title}>Theo dõi chúng tôi</h3>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.icon}><i className="fab fa-facebook-f"></i></a>
            <a href="#" className={styles.icon}><i className="fab fa-instagram"></i></a>
            <a href="#" className={styles.icon}><i className="fab fa-twitter"></i></a>
            <a href="#" className={styles.icon}><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Group 4. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
