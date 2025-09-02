import { create } from 'zustand';
import axios from 'axios';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import LoadingPage from '../pages/LoadingPage/LoadingPage';

export const useAuthStore = create((set) => ({
    loading: false,
    token: null,
    fetchToken: async (email, password) => {
        const loading = true;
        if (loading) {
            <LoadingPage/>
        }
        try {
            const res = await axios.post('http://localhost:1337/api/auth/local', {
                identifier: email,
                password: password,
            });
            set({ token: res.data.jwt });
            return res.data.jwt;
        } catch (error) {
            loading = false;
            console.log(error);
            <ErrorPage/>
        }
    },
}));

export default useAuthStore;