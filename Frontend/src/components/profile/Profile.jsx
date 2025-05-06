import React from 'react'
import styles from '../../styles/Profile.module.css'
import { useAuth } from '../../auth';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';

const Profile = () => {
    const [auth] = useAuth();
    const navigate = useNavigate();


    console.log('Auth:', auth);

    const handlLogin = () => {
        navigate('/login')
    }

    if (!auth?.user) {
        return <div style={{ textAlign: 'center', marginTop: '100px', marginBottom: '100px' }}>
            <h1 >Vui lòng đăng nhập </h1>
            <button onClick={handlLogin} style={{ marginTop: '20px', padding: '10px 40px', cursor: 'pointer' }}>Login</button>
        </div>
    }
    return (
        <Layout title={"Thông tin cá nhân"}>
            <div className={styles.containerP}>
                <div className={styles.containerIn}>
                    <div className={styles.leftP}>
                        <img src="https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg" />
                        <h4>{auth.user.name}</h4>
                        <div>{auth.user.address}</div>
                    </div>
                    <div className={styles.rightP}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Thông tin cá nhân</h3>

                        </div>
                        <div className={styles.inRightProfileUser}>
                            <div>Hoj và tên:</div>
                            <div>{auth.user.name}</div>
                        </div>
                        <hr />
                        <div className={styles.inRightProfileUser}>
                            <div>Email:</div>
                            <div>{auth.user.email}</div>
                        </div>
                        <hr />
                        <div className={styles.inRightProfileUser}>
                            <div>Số điện thoại:</div>
                            <div>{auth.user.phone}</div>
                        </div>
                        <hr />
                        <div className={styles.inRightProfileUser}>
                            <div>Giới tính:</div>
                            <div>{auth.user.gender}</div>
                        </div>
                        <hr />

                    </div>
                </div>
            </div >
        </Layout>
    )
}

export default Profile
