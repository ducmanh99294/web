import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AdminProduct = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        image: '',
        description: '',
        price: '',
        priceGoc: '',
        discount: '',
        quantity: ''
    });

    const [createForm, setCreateForm] = useState({
        name: '',
        image: '',
        description: '',
        price: '',
        priceGoc: '',
        discount: '',
        quantity: ''
    });

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/v1/all-products');
            setProducts(res.data.products);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/product/${id}`);
            setProducts(products.filter(product => product._id !== id));
            toast.success('Xóa sản phẩm thành công');
        } catch (error) {
            console.log(error);
            toast.error('Xóa sản phẩm thất bại');
        }
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setEditForm({
            name: product.name,
            image: product.image,
            description: product.description,
            price: product.price,
            priceGoc: product.priceGoc,
            discount: product.discount,
            quantity: product.quantity
        });
    };

    const handleChange = (e, setForm) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'priceGoc' || name === 'discount' || name === 'quantity' ? Number(value) : value
        }));
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.put(`http://localhost:3000/api/v1/product/${editingProduct._id}`, editForm);
            const updated = res.data.data;
            setProducts(prev => prev.map(p => p._id === updated._id ? updated : p));
            toast.success('Cập nhật sản phẩm thành công');
            setEditingProduct(null);
        } catch (error) {
            console.log(error);
            toast.error('Cập nhật thất bại');
        }
    };

    const handleCreate = async () => {
        try {
            console.log('Dữ liệu gửi lên:', createForm);
            const res = await axios.post('http://localhost:3000/api/v1/create-product', createForm);
            setProducts(prev => [...prev, res.data.product]);
            toast.success('Thêm sản phẩm thành công');
            setCreateForm({
                name: '',
                image: '',
                description: '',
                price: '',
                priceGoc: '',
                discount: '',
                quantity: ''
            });
        } catch (error) {
            console.log(error);
            toast.error('Thêm sản phẩm thất bại');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">🛒 Quản Lý Sản Phẩm</h2>

            {/* Form thêm sản phẩm */}
            <div className="mb-5 p-4 border rounded shadow-sm">
                <h5>Thêm sản phẩm mới</h5>
                <div className="row g-3">
                    {['name', 'image', 'description', 'price', 'priceGoc', 'discount', 'quantity'].map((field, idx) => (
                        <div className="col-md-3" key={idx}>
                            <input
                                type={['price', 'priceGoc', 'discount', 'quantity'].includes(field) ? 'number' : 'text'}
                                name={field}
                                placeholder={field}
                                className="form-control"
                                value={createForm[field]}
                                onChange={(e) => handleChange(e, setCreateForm)}
                            />
                        </div>
                    ))}
                    <div className="col-md-2 d-grid">
                        <button className="btn btn-primary" onClick={handleCreate}>Thêm</button>
                    </div>
                </div>
            </div>

            {/* Bảng sản phẩm */}
            <div className="table-responsive shadow rounded">
                <table className="table table-striped table-hover table-bordered align-middle">
                    <thead className="table-dark text-center">
                        <tr>
                            <th>STT</th>
                            <th>Ảnh</th>
                            <th>Tên</th>
                            <th>Mô tả</th>
                            <th>Giá gốc</th>
                            <th>Giá KM</th>
                            <th>Giảm (%)</th>
                            <th>Số lượng</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {products.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={product.image} alt={product.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.priceGoc?.toLocaleString()}₫</td>
                                <td>{product.price?.toLocaleString()}₫</td>
                                <td>{product.discount}%</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditClick(product)}>Sửa</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product._id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Form chỉnh sửa sản phẩm */}
            {editingProduct && (
                <div className="mt-4 p-4 border rounded shadow">
                    <h5>Cập nhật sản phẩm</h5>
                    {Object.keys(editForm).map((key, idx) => (
                        <div className="mb-3" key={idx}>
                            <label className="form-label text-capitalize">{key}</label>
                            <input
                                type={['price', 'priceGoc', 'discount', 'quantity'].includes(key) ? 'number' : 'text'}
                                name={key}
                                className="form-control"
                                value={editForm[key]}
                                onChange={(e) => handleChange(e, setEditForm)}
                            />
                        </div>
                    ))}
                    <button className="btn btn-success me-2" onClick={handleUpdate}>Cập nhật</button>
                    <button className="btn btn-secondary" onClick={() => setEditingProduct(null)}>Hủy</button>
                </div>
            )}
        </div>
    );
};

export default AdminProduct;
