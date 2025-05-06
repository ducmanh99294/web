import React from 'react';
import { useAuth } from '../../auth';

const Dashboard = () => {
    const [auth] = useAuth();

    if (!auth.user) {
        return <p style={{ textAlign: 'center' }}>Loading...</p>;
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: '50px' }}>
                Welcome Admin {auth.user.name}
            </h1>
        </div>
    );
};

export default Dashboard;
