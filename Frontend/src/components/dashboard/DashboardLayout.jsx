import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const handlBackHome = () => {
        navigate('/');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside style={{
                position: 'sticky',
                top: 0, // ✅ Cần để sticky hoạt động
                alignSelf: 'flex-start', // ✅ Đảm bảo đúng chiều cao
                height: '100vh', // ✅ Cố định chiều cao toàn màn hình
                width: '250px',
                background: '#1e293b',
                color: 'white',
                padding: '20px 15px',
                boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
                overflowY: 'auto' // ✅ Cho cuộn riêng nếu nhiều nội dung
            }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Admin Panel</h2>
                <nav>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <li><Link to="/dashboard" style={linkStyle}>Dashboard</Link></li>
                        <li><Link to="/dashboard/adminProduct" style={linkStyle}>Quản lý sản phẩm</Link></li>
                        <li><Link to="/dashboard/adminUser" style={linkStyle}>Quản lý người dùng</Link></li>
                        <li><Link to="/dashboard/adminBlog" style={linkStyle}>Quản lý blog</Link></li>
                        <li><Link to="/dashboard/settings" style={linkStyle}>Cài đặt</Link></li>
                        <button onClick={handlBackHome} style={{ marginTop: '12px', padding: '8px', background: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer' }}>Quay lại</button>
                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            <div style={{ flex: 1, background: '#f1f5f9', padding: '20px', overflowY: 'auto' }}>
                {/* Header */}
                <header style={{
                    background: 'white',
                    padding: '5px 10px',
                    borderBottom: '1px solid #e2e8f0',
                    marginBottom: '20px'
                }}>
                    <h1 style={{ margin: 0 }}>Dashboard</h1>
                </header>

                {/* Nội dung chính */}
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '8px 0',
    display: 'block'
};

export default Dashboard;
