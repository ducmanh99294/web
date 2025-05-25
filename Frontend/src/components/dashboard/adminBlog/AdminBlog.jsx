import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API;

const AdminBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState({ nameBlog: '', description: '', imageBlog: '' });
    const [editingBlog, setEditingBlog] = useState(null);
    const [editForm, setEditForm] = useState({ nameBlog: '', description: '', imageBlog: '' });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/v3/blogs`);
            setBlogs(res.data.blogs || []);
        } catch (error) {
            console.error(error);
            toast.error('Lỗi khi lấy danh sách blog');
        }
    };

    const handleChange = (e, formSetter) => {
        const { name, value } = e.target;
        formSetter(prev => ({ ...prev, [name]: value }));
    };

    const handleAddBlog = async () => {
        if (!newBlog.nameBlog || !newBlog.description || !newBlog.imageBlog) {
            toast.error('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        try {
            await axios.post(`${API_URL}/api/v3/create-blog`, newBlog);
            toast.success('Thêm blog thành công');
            setNewBlog({ nameBlog: '', description: '', imageBlog: '' });
            fetchBlogs(); // 👉 Load lại danh sách từ server
        } catch (error) {
            console.error(error);
            toast.error('Thêm blog thất bại');
        }
    };

    const handleDeleteBlog = async (id) => {
        if (!confirm('Bạn có chắc chắn muốn xóa blog này?')) return;

        try {
            await axios.delete(`${API_URL}/api/v3/blog/${id}`);
            toast.success('Xóa blog thành công');
            fetchBlogs(); // 👉 Load lại danh sách sau khi xóa
        } catch (error) {
            console.error(error);
            toast.error('Xóa blog thất bại');
        }
    };

    const handleEditClick = (blog) => {
        setEditingBlog(blog);
        setEditForm({
            nameBlog: blog.nameBlog,
            description: blog.description,
            imageBlog: blog.imageBlog
        });
        window.scrollTo(0, 0);
    };

    const handleUpdateBlog = async () => {
        if (!editingBlog) return;

        try {
            await axios.put(`${API_URL}/api/v3/blog/${editingBlog._id}`, editForm);
            toast.success('Cập nhật blog thành công');
            fetchBlogs(); // 👉 Đảm bảo dữ liệu mới nhất
            setEditingBlog(null);
        } catch (error) {
            console.error(error);
            toast.error('Cập nhật blog thất bại');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">📝 Quản Lý Blog</h2>

            {/* Form thêm hoặc chỉnh sửa */}
            <div className="mb-5 p-4 border rounded shadow-sm">
                <h5>{editingBlog ? '✏️ Cập nhật blog' : '➕ Thêm Blog Mới'}</h5>
                <div className="row g-3">
                    <div className="col-md-4">
                        <input
                            type="text"
                            name="nameBlog"
                            placeholder="Tiêu đề blog"
                            className="form-control"
                            value={editingBlog ? editForm.nameBlog : newBlog.nameBlog}
                            onChange={(e) => handleChange(e, editingBlog ? setEditForm : setNewBlog)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            name="description"
                            placeholder="Mô tả"
                            className="form-control"
                            value={editingBlog ? editForm.description : newBlog.description}
                            onChange={(e) => handleChange(e, editingBlog ? setEditForm : setNewBlog)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            name="imageBlog"
                            placeholder="URL ảnh"
                            className="form-control"
                            value={editingBlog ? editForm.imageBlog : newBlog.imageBlog}
                            onChange={(e) => handleChange(e, editingBlog ? setEditForm : setNewBlog)}
                        />
                    </div>
                    <div className="col-md-2 mt-2">
                        {editingBlog ? (
                            <>
                                <button className="btn btn-success w-100" onClick={handleUpdateBlog}>Cập nhật</button>
                                <button className="btn btn-secondary w-100 mt-2" onClick={() => setEditingBlog(null)}>Hủy</button>
                            </>
                        ) : (
                            <button className="btn btn-primary w-100" onClick={handleAddBlog}>Thêm</button>
                        )}
                    </div>
                </div>
            </div>

            {/* Danh sách blog */}
            <div className="row">
                {blogs.map((bl) => (
                    <div key={bl._id} className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100">
                            <img src={bl.imageBlog} alt={bl.nameBlog} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                            <div className="card-body">
                                <h5 className="card-title">{bl.nameBlog}</h5>
                                <p className="card-text">{bl.description}</p>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-sm btn-warning" onClick={() => handleEditClick(bl)}>Sửa</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDeleteBlog(bl._id)}>Xóa</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminBlog;
