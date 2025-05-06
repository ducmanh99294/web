import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Blog.module.css';
import Layout from '../../Layout/Layout';
const API_URL = import.meta.env.VITE_API;

const Blog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getAllBlog = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/v3/blogs`);
                setBlogs(res.data.blogs);
            } catch (error) {
                console.error('Lỗi khi lấy blogs:', error);
            }
        };
        getAllBlog();
    }, []);

    return (
        <Layout>
            <div className={styles.containerBlog}>
                <div className={styles.blogList}>
                    {blogs.map((b, index) => (
                        <div key={index} className={styles.blogItem}>
                            <img src={b.imageBlog} alt={b.nameBlog} className={styles.blogImageHorizontal} />
                            <div className={styles.blogContent}>
                                <h3 className={styles.blogName}>{b.nameBlog}</h3>
                                <p className={styles.blogDesc}>
                                    {b.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>

    );
};

export default Blog;
