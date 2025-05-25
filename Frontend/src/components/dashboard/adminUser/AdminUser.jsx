import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API;

const AdminUser = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        gender: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/v2/users`);
            setUsers(res.data);
        } catch (error) {
            console.error(error);
            toast.error("Không thể tải danh sách người dùng.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/v2/delete/users/${id}`);
            setUsers(prev => prev.filter(user => user._id !== id));
            toast.success("Xóa người dùng thành công");
        } catch (error) {
            console.error(error);
            toast.error("Xóa người dùng thất bại");
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        setEditForm({
            name: user.name,
            email: user.email,
            gender: user.gender,
            phone: user.phone,
            address: user.address
        });
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.put(`http://localhost:3000/api/v2/users/${editingUser._id}`, editForm);
            const updated = res.data;
            setUsers(prev => prev.map(user => user._id === updated._id ? updated : user));
            toast.success("Cập nhật người dùng thành công");
            fetchUsers();
            setEditingUser(null);
        } catch (error) {
            console.error(error);
            toast.error("Cập nhật thất bại");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">👤 Quản Lý Người Dùng</h2>

            {/* Bảng người dùng */}
            <div className="table-responsive shadow rounded">
                <table className="table table-striped table-hover table-bordered align-middle">
                    <thead className="table-dark text-center">
                        <tr>
                            <th>STT</th>
                            <th>Họ và tên</th>
                            <th>Email</th>
                            <th>Giới tính</th>
                            <th>Điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>{user.phone}</td>
                                <td>{user.address}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(user)}>Sửa</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Form chỉnh sửa */}
            {editingUser && (
                <div className="mt-4 p-4 border rounded shadow">
                    <h5>Cập nhật người dùng</h5>
                    {Object.keys(editForm).map((key, idx) => (
                        <div className="mb-3" key={idx}>
                            <label className="form-label text-capitalize">{key}</label>
                            <input
                                type="text"
                                name={key}
                                className="form-control"
                                value={editForm[key]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <button className="btn btn-success me-2" onClick={handleUpdate}>Cập nhật</button>
                    <button className="btn btn-secondary" onClick={() => setEditingUser(null)}>Hủy</button>
                </div>
            )}
        </div>
    );
};

export default AdminUser;
