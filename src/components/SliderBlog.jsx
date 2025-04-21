import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import styles from '../styles/SliderBlog.module.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

const BlogSlider = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('https://api-3ff8.onrender.com/api/v3/blogs');
                console.log('Dữ liệu trả về từ API blog:', res.data);

                // Kiểm tra dữ liệu và truy cập vào mảng blogs
                if (Array.isArray(res.data.blogs)) {
                    setBlogs(res.data.blogs.slice(0, 4)); // Lấy 4 bài blog đầu tiên
                } else {
                    console.error('Dữ liệu blogs không phải là mảng. Cấu trúc dữ liệu trả về:', res.data);
                }
            } catch (err) {
                console.error('Lỗi khi gọi API blog:', err);
            }
        };

        fetchBlogs();
    }, []);


    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };
    const handlBlog = () => {
        navigate('/blog')
    }
    return (
        <div className={styles.blogSlider}>
            <h2 className={styles.title}>Tin tức mới</h2>
            <Slider {...settings}>
                {blogs.map((blog, index) => (
                    <div key={index} className={styles.blogCard} onClick={handlBlog}>
                        <img
                            src={blog.imageBlog}
                            alt={blog.nameBlog}
                            className={styles.blogImage}
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
                        />
                        <div className={styles.blogInfo}>
                            <h3 className={styles.blogTitle}>{blog.nameBlog}</h3>
                            <p>{blog.description.length > 50 ? blog.description.slice(0, 30) + '...' : blog.description}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default BlogSlider;
