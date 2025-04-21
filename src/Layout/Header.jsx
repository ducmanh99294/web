import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css';
import { useCart } from '../CartContext';
import { useAuth } from '../auth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { cartItems } = useCart();
  const [auth, setAuth] = useAuth();


  const cartCount = cartItems.length;
  const accountRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleAccountDropdown = () => setIsAccountOpen(prev => !prev);

  // Click ra ngoài dropdown sẽ đóng
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logo}>
            ShopNow
          </Link>
        </div>

        <div className={`${styles.navContainer} ${isMenuOpen ? styles.active : ''}`}>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link to="/" className={styles.navLink}>Trang chủ</Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/products" className={styles.navLink}>Sản phẩm</Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/blog" className={styles.navLink}>blog</Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/*" className={styles.navLink}>Liên hêj</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.actionContainer}>
          <div className={`${styles.searchContainer} ${isSearchOpen ? styles.active : ''}`}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Tìm kiếm sản phẩm..."
            />
            <button className={styles.searchButton} onClick={toggleSearch}>
              <svg className={styles.searchIcon} viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 
                16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 
                0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 
                19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 
                9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </button>
          </div>

          <div className={styles.userActions}>
            <Link to="/wishlist" className={styles.actionButton}>
              <svg className={styles.actionIcon} viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 
                15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 
                0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 
                3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
                11.54L12 21.35z" />
              </svg>
              <span className={styles.itemCount}>0</span>
            </Link>

            <Link to="/cart" className={styles.actionButton}>
              <svg className={styles.actionIcon} viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 
                2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 
                7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 
                1.1.9 2 2 2h12v-2H7.42c-.14 
                0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 
                0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 
                0-.55-.45-1-1-1H5.21l-.94-2H1zm16 
                16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 
                2 2-.9 2-2-.9-2-2-2z" />
              </svg>
              <span className={styles.itemCount}>{cartCount}</span>
            </Link>

            {/* Account Dropdown */}
            <div className={styles.accountWrapper} ref={accountRef}>
              <button className={styles.actionButton} onClick={toggleAccountDropdown}>
                <svg className={styles.actionIcon} viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 
                  12s4.48 10 10 10 10-4.48 10-10S17.52 2 
                  12 2zm0 3c1.66 0 3 1.34 3 
                  3s-1.34 3-3 3-3-1.34-3-3 
                  1.34-3 3-3zm0 
                  14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 
                  4-3.08 6-3.08 1.99 0 5.97 1.09 6 
                  3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </button>

              {isAccountOpen && (
                <div className={styles.accountDropdown}>
                  {auth?.user ? (
                    <>
                      <Link to="/profile" className={styles.dropdownItem}>Tài khoản</Link>
                      <Link to="/orders" className={styles.dropdownItem}>Đơn hàng</Link>
                      <Link to="/dashboard" className={styles.dropdownItem}>Dashboard</Link>
                      <button
                        style={{ width: '100%' }}
                        className={styles.dropdownItem}
                        onClick={() => {
                          setAuth({ ...auth, user: null, token: '' });
                          localStorage.removeItem('auth');
                        }}
                      >
                        Đăng xuất
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/profile" className={styles.dropdownItem}>Tài khoản</Link>
                      <Link to="/login" className={styles.dropdownItem}>Đăng nhập</Link>
                      <Link to="/register" className={styles.dropdownItem}>Đăng ký</Link>
                    </>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>

        <button className={styles.mobileMenuButton} onClick={toggleMenu}>
          <div className={`${styles.menuIcon} ${isMenuOpen ? styles.open : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
