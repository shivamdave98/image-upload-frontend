import { useState } from 'react';
import { createAuthProvider } from 'react-token-auth';


// export const [useAuth, authFetch, login, logout] =
//     createAuthProvider({
//         accessTokenKey: 'access_token',
//         onUpdateToken: (token) => fetch('/api/refresh', {
//             method: 'POST',
//             body: token.access_token
//         })
//             .then(r => r.json())
//     });

export function useToken() {
    function getToken() {
        const userToken = localStorage.getItem('token');
        return userToken && userToken
    }

    const [token, setToken] = useState(getToken());

    function saveToken(userToken) {
        localStorage.setItem('token', userToken);
        setToken(userToken);
    };

    function removeToken() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return {
        setToken: saveToken,
        token,
        removeToken
    }

}

export function useUserId() {
    function getUserId() {
        const userId = localStorage.getItem('userId');
        return userId;
    }

    const [userId, setUserId] = useState(getUserId());

    function saveUserId(userId) {
        localStorage.setItem('userId', userId);
        setUserId(userId);
    };

    function removeUserId() {
        localStorage.removeItem("userId");
        setUserId(null);
    }

    return {
        setUserId: saveUserId,
        userId,
        removeUserId
    }
}