import { create } from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set) => ({
    token: null,
    fetchToken: async (email, password) => {
        try {
            const res = await axios.post('http://localhost:1337/api/auth/local', {
                identifier: email,
                password: password,
            });
            set({ token: res.data.jwt });
            return res.data.jwt;
        } catch (error) {
            set({ token: null });
            return null;
        }
    },
}));

export default useAuthStore;