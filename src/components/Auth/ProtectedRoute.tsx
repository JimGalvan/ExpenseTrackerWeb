import React from 'react';
import {Navigate} from 'react-router-dom';
import useAuthStore from '../../state/authStore';

const ProtectedRoute = ({children}: { children: JSX.Element }) => {
    const token = useAuthStore((state) => state.token);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    return children;
};

export default ProtectedRoute;