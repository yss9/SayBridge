import React, { useContext, useEffect, useRef } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function PrivateRoute() {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const alerted = useRef(false);

    // 훅은 항상 최상단에서!
    useEffect(() => {
        if (!loading && !user && !alerted.current) {
            alert('로그인이 필요합니다');
            alerted.current = true;
        }
    }, [loading, user]);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return <Outlet />;
}
