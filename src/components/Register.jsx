import { useState } from "react";

import styles from "../styles/Register.module.css";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import Layout from "../Layout/Layout";


const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [gender, setGender] = useState("")
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`https://api-3ff8.onrender.com/api/v2/register`, {
                name,
                email,
                password,
                phone,
                address,
                gender
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login")
            } else {
                console.log("Error: ", res.data.message);
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    };


    return (
        <Layout>
            <div>
                <div className={styles.Register}>
                    <form className={styles.RegisterForm} onSubmit={handleSubmit}>
                        <h2>Trang đăng ký</h2>
                        <div className={styles.formGroup}>

                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nhập tên của banj"
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Nhập email của bạn"
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>

                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Nhập password của bạn"
                                required=""
                            />
                        </div>
                        <div className={styles.formGroup}>

                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Nhập sdt của bạn"
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>

                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Nhập địa chỉ của bạn"
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>

                            <input
                                type="text"
                                id="gender"
                                name="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                placeholder="Nhập giới tính (nam/nữ)"
                                required
                            />
                        </div>
                        <button type="submit" className={styles.RegisterButton}>
                            Đăng ký
                        </button>
                        <div className="form-footer">
                            <p>
                                Nếu bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Register;