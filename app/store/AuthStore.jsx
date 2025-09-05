import { create } from 'zustand';
import axios from 'axios';
import { persist } from 'zustand/middleware';
import { endPoint } from './UseApisStore';


export const useAuthStore = create(persist(
    (set) => ({
        token: null,
        setToken: (token) => set({ token }),
        isLogin: false,
        setIsLogin: (isLogin) => set({ isLogin }),
        fetchToken: async (email, password) => {
            try {
                const res = await axios.post(`${endPoint}auth/local`, {
                    identifier: email,
                    password: password,
                });
                set({ token: res.data.jwt, isLogin: true });
                localStorage.setItem('isLogin', true);
                return res.data.jwt;
            } catch (error) {
                console.log(error);
            }
        },
    })
));

export default useAuthStore;