import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const AdminBlog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const GetALLBlogs = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/v3/blogs');
                setBlogs(res.data.blogs);
            } catch (error) {
                console.log(error);
                toast.error('Lỗi khi lấy danh sách blog');
            }
        };
        GetALLBlogs()
    }, [])
    return (
        <div>
            <h1>Blpg</h1>
            {blogs.map((bl, index) => (
                <div key={index} className="blog-item">
                    <h2>{bl.nameBlog}</h2>
                    <p>{bl.description}</p>
                    <img src={bl.imageBlog} />
                </div>
            ))}
        </div>
    )
}

export default AdminBlog
