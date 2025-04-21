import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/DetailProduct.module.css';
import { useCart } from '../CartContext'; // Import useCart hook
import toast from 'react-hot-toast';
import Layout from '../Layout/Layout';

const ProductDetails = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [product, setProduct] = useState(location.state?.product || null);
    const [loading, setLoading] = useState(!location.state?.product);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart(); // Sử dụng hook useCart

    useEffect(() => {
        if (!location.state?.product && productId) {
            const fetchProductDetails = async () => {
                try {
                    setLoading(true);
                    const res = await axios.get(`https://api-3ff8.onrender.com/api/v1/product-detail/${productId}`);
                    setProduct(res.data.product || res.data);
                    setLoading(false);
                } catch (error) {
                    console.error("Lỗi khi tải chi tiết sản phẩm:", error);
                    setError("Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.");
                    setLoading(false);
                }
            };

            fetchProductDetails();
        }
    }, [productId, location.state]);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = () => {
        if (!product) return;

        // Đảm bảo product có _id
        const productToAdd = {
            ...product,
            _id: product._id || product.id || Math.random().toString(36).substr(2, 9),
            quantity: quantity
        };

        // Sử dụng function từ Context API
        addToCart(productToAdd);
        // alert('Sản phẩm đã được thêm vào giỏ hàng!');
        toast.success('Sản phẩm đã được thêm vào giỏ hàng!')
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <p className={styles.loading}>Đang tải thông tin sản phẩm...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.error}>{error}</p>
                <button className={styles.backButton} onClick={handleGoBack}>Quay lại</button>
            </div>
        );
    }

    if (!product) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.error}>Không tìm thấy sản phẩm</p>
                <button className={styles.backButton} onClick={handleGoBack}>Quay lại</button>
            </div>
        );
    }

    return (
        <Layout>
            <div className={styles.container}>
                <button className={styles.backButton} onClick={handleGoBack}>← Quay lại</button>

                <div className={styles.productContainer}>
                    <div className={styles.imageSection}>
                        <img
                            src={product.image}
                            alt={product.name}
                            className={styles.productImage}
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/500x500?text=No+Image'; }}
                        />
                        {product.discount && product.discount > 0 && (
                            <div className={styles.discountBadge}>-{product.discount}%</div>
                        )}
                    </div>

                    <div className={styles.infoSection}>
                        <div className={styles.category}>{product.category}</div>
                        <h1 className={styles.productName}>{product.name}</h1>
                        <div className={styles.price}>{product.price?.toLocaleString('vi-VN')} đ</div>

                        <div className={styles.description}>
                            <h3>Mô tả sản phẩm</h3>
                            <p>{product.description}</p>
                        </div>

                        {product.features && (
                            <div className={styles.features}>
                                <h3>Tính năng</h3>
                                <ul>
                                    {product.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className={styles.quantitySelector}>
                            <h3>Số lượng</h3>
                            <div className={styles.quantityControls}>
                                <button onClick={handleDecreaseQuantity} className={styles.quantityButton}>-</button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    min="1"
                                    className={styles.quantityInput}
                                />
                                <button onClick={handleIncreaseQuantity} className={styles.quantityButton}>+</button>
                            </div>
                        </div>

                        <button className={styles.addToCartButton} onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;