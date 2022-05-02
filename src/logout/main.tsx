import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginPage } from '../login-page';
import { useUserId, useToken } from '../auth';

export const Logout = () => {
    const navigate = useNavigate();

    const { token, removeToken } = useToken();
    const { userId, removeUserId } = useUserId();

    useEffect(() => {
        if (token) {
            removeToken();
        }

        if (userId) {
            removeUserId();
        }

        navigate('/login');
        window.location.reload();
    }, [])

    return (<div></div>);
}