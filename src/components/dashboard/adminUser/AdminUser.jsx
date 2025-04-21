import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";

const AdminUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getAllusers = async () => {
            try {
                const res = await axios.get("https://api-3ff8.onrender.com/api/v2/users");
                console.log(res.data);
                setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getAllusers();
    }, []);

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`https://api-3ff8.onrender.com/api/v2/delete/users/${id}`);
            console.log('Xóa người dùng thành công', response.data);
            setUsers(users.filter(user => user._id != id))
            toast.success('Xóa người dùng thành công')
        } catch (error) {
            console.log(error);
            toast.error('Xóa ngươif dùng thất bại');
        }
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Quản Lý Người Dùng</h2>
            <div className="table-responsive shadow-sm rounded">
                <table className="table table-striped table-hover table-bordered">
                    <thead className="table-dark text-center">
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Họ và tên</th>
                            <th scope="col">Email</th>
                            <th scope="col">Giới tính</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-center align-middle">
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>{user.phone}</td>
                                <td>{user.address}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user._id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUser;
