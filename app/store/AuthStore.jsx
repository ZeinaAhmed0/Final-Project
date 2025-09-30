import { create } from 'zustand';
import axios from 'axios';
import { endPoint } from './UseApisStore';

export const useAuthStore = create((set) => ({
    token: null,
    isLogin: false,
    setToken: (token) => set({ token }),
    setIsLogin: (isLogin) => set({ isLogin }),
    fetchToken: async (email, password) => {
        try {
            const res = await axios.post(`${endPoint}auth/local`, {
                identifier: email,
                password: password,
            });
            const jwt = res.data.jwt;
            set({ token: jwt, isLogin: true });
            return jwt;
        } catch (error) {
            const message = 'Invalid email or password';
            throw new Error(message);
        }
    },
    loadTokenFromStorage: () => {
        if (typeof window !== 'undefined') {
            const token = sessionStorage.getItem('token');
            if (token) {
                set({ token, isLogin: true });
            }
        }
    },
}));

export default useAuthStore;
