import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/HomePage.module.css';
import Slider from './Slider';
import BlogSlider from './SliderBlog';
import { useNavigate } from 'react-router-dom'; // Import from react-router-dom
import Layout from '../Layout/Layout'

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use navigate instead of router

  useEffect(() => {
    const getALLProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://api-3ff8.onrender.com/api/v1/all-products");
        console.log("Dữ liệu trả về từ API:", res.data);
        setProducts(res.data.products);
        setLoading(false);
      } catch (error) {
        console.log("Lỗi khi gọi API:", error);
        setLoading(false);
      }
    };
    getALLProducts();
  }, []);

  // Handler function for product click
  const handleProductClick = (product) => {
    // Pass the entire product object as state
    navigate(`/products/${product._id}`, { state: { product } });
  };

  return (
    <Layout title={"Trang chủ"}>
      <div>
        <Slider />
      </div>
      <div>
        <h1 style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold', marginTop: '40px', fontFamily: 'Arial, sans-serif' }}>Tất cả sản phẩm</h1>
      </div>
      <div className={styles.container}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <p className={styles.loading}>Đang tải sản phẩm...</p>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {products && products.length > 0 ? (
              products.map((p, index) => (
                <div
                  key={index}
                  className={styles.productCard}
                  onClick={() => handleProductClick(p)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.imageContainer}>
                    <img
                      src={p.image}
                      alt={p.name}
                      className={styles.productImage}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/300x220?text=No+Image'; }}
                    />
                    {p.discount && p.discount > 0 && (
                      <div className={styles.discount}>-{p.discount}%</div>
                    )}
                  </div>
                  <div className={styles.productInfo}>
                    <div className={styles.category}>{p.category}</div>
                    <h2 className={styles.name}>{p.name}</h2>
                    <p className={styles.description}>{p.description}</p>
                    <div className={styles.price}>{p.price?.toLocaleString('vi-VN')} đ</div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noProducts}>Không có sản phẩm nào</div>
            )}
          </div>
        )}
      </div>

      <div className={styles.sliderBlog}>
        <BlogSlider />
      </div>
    </Layout>
  );
};

export default HomePage;