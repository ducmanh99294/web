import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/HomePage.module.css';
import Slider from './Slider';
import BlogSlider from './SliderBlog';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';

const API_URL = import.meta.env.VITE_API;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  
    fetchAllProducts();
  }, []);

  // const fetchCategories = async () => {
  //   try {
  //     const res = await axios.get(`${API_URL}/api/v4/get-category`);
  //     setCategories(res.data.categories);
  //   } catch (error) {
  //     console.error("Lỗi lấy danh mục:", error);
  //   }
  // };

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/v1/all-products`);
      setProducts(res.data.products);
      setLoading(false);
    } catch (error) {
      console.log("Lỗi khi gọi API:", error);
      setLoading(false);
    }
  };

  // const fetchProductsByCategory = async (slug) => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(`${API_URL}/api/v4/get-category/${slug}`);
  //     setProducts(res.data.products);
  //     setSelectedCategory(slug);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Lỗi khi lọc sản phẩm:", error);
  //     setLoading(false);
  //   }
  // };

  const handleProductClick = (product) => {
    navigate(`/products/${product._id}`, { state: { product } });
  };

  return (
    <Layout title={"Trang chủ"}>
      <div><Slider /></div>



      <div className={styles.container}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <p className={styles.loading}>Đang tải sản phẩm...</p>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {products.length > 0 ? (
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
                  <div className={styles.category}>{p.category?.name}</div>
                    <h2 className={styles.name}>{p.name}</h2>
                    <p className={styles.description}>{p.description}</p>
                    <div className={styles.price}>{p.price?.toLocaleString('vi-VN')} $</div>
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
