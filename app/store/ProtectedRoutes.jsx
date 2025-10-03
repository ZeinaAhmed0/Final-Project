'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useAuthStore from '@/app/store/AuthStore';
import { UseLoadingStore } from '@/app/hooks/UseLoadingStore';
import LoadingPage from '@/app/pages/LoadingPage/LoadingPage';

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isLogin, loadTokenFromStorage } = useAuthStore();
    const { loading, setLoading } = UseLoadingStore();
    useEffect(() => {
        loadTokenFromStorage();
    }, [loadTokenFromStorage]);
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            if (!isLogin) {
                router.push('/loginPage');
            }
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [isLogin, pathname, router, setLoading]);
    return loading ? <LoadingPage /> : <>{children}</>;
}
