import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import styles from '../styles/Cart.module.css';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import toast from 'react-hot-toast';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, [cartItems]);

    const handBack = () => {
        navigate('/')
    }

    const handleError = () => {
        toast.error('Chức năng này hiện đang được phát triển!');
    }
    return (
        <Layout>
            <div className={styles.cartPage}>
                <h1 className={styles.cartTitle}>Giỏ hàng</h1>
                {cartItems.length === 0 ? (
                    <div className={styles.emptyCart}>
                        <img
                            style={{
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto",
                                width: "50%",
                            }}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvjDt1L5vdIyVa-qJVpE9x97aw6gpV9JbmjQ&s"
                            alt=""
                        />
                        <h3 style={{ textAlign: "center", marginTop: "20px" }}>Giỏ hàng của bạn đang trống</h3>
                    </div>

                ) : (
                    <div className={styles.cartContent}>
                        <div className={styles.cartItems}>
                            {cartItems.map((item) => (
                                <div key={item._id} className={styles.cartItem}>
                                    <img src={item.image} alt={item.name} className={styles.productImage} />
                                    <div className={styles.productDetails}>
                                        <h3>{item.name}</h3>
                                        <p className={styles.price}>{item.price.toLocaleString('vi-VN')} đ</p>
                                        <p>Số lượng: {item.quantity}</p>
                                    </div>
                                    <button onClick={() => removeFromCart(item._id)} className={styles.removeButton}>
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className={styles.summaryBox}>
                            <h2>Tóm tắt đơn hàng</h2>
                            <div className={styles.summaryRow}>
                                <span>Tổng tiền:</span>
                                <span className={styles.totalPrice}>{totalPrice.toLocaleString('vi-VN')} đ</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <span>Giảm gias:</span>
                                <span>Không sử dụng phiếu </span>
                            </div>
                            <button className={styles.checkoutButton} onClick={handleError}>Tiến hành thanh toán</button>
                            <button className={styles.continueShoppingButton} onClick={handBack}>Tiếp tục mua sắm</button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Cart;
