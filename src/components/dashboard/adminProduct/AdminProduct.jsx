import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AdminProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await axios.get('https://api-3ff8.onrender.com/api/v1/all-products');
                setProducts(res.data.products);
            } catch (error) {
                console.log(error);
            }
        };
        getAllProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://api-3ff8.onrender.com/api/v1/product/${id}`);
            console.log(response);

            setProducts(products.filter(product => product._id !== id));
            toast.success('Xóa sản phẩm thành công');
        } catch (error) {
            console.log(error);
            toast.error('Xóa sản phẩm thất bại');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">🛒 Quản Lý Sản Phẩm</h2>
            <div className="table-responsive shadow rounded">
                <table className="table table-striped table-hover table-bordered align-middle">
                    <thead className="table-dark text-center">
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Khuyến mãi</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.price.toLocaleString()}₫</td>
                                <td>{product.discount}%</td>
                                <td>
                                    <button className="btn btn-sm btn-warning me-2">Sửa</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product._id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProduct;
