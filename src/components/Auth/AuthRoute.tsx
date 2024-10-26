import React from 'react';
import {Navigate} from 'react-router-dom';
import useAuthStore from '../../state/authStore';

const AuthRoute = ({children}: { children: JSX.Element }) => {
    const token = useAuthStore((state) => state.token);
    return token ? children : <Navigate to="/"/>;
};

export default AuthRoute;