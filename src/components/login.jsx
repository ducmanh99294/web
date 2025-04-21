import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import styles from '../styles/Login.module.css'
import { useAuth } from '../auth';
import Layout from '../Layout/Layout';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://api-3ff8.onrender.com/api/v2/login`, { email, password });
            if (res.data.token) {
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem('auth', JSON.stringify(res.data));

                toast.success("Đăng nhập thành công!");
                navigate('/');  // Chuyển hướng về trang chủ
            } else {
                toast.error(res.data.message || "Lỗi đăng nhập");
            }
        } catch (error) {
            console.log(error);
            toast.error('Đăng nhập thất bại');
        }
    };

    return (
        <Layout>
            <div className={styles.loginContainer}>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <h2>Đăng nhập</h2>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>Đăng nhập</button>
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                        Nếu bạn chưa có tk: <Link to={'/register'}>Register</Link>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default Login;
