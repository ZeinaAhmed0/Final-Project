'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useAuthStore from '@/app/store/AuthStore';
import { UseLoadingStore } from '@/app/store/UseLoadingStore';
import LoadingPage from '@/app/pages/LoadingPage/LoadingPage';

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isLogin } = useAuthStore();
    const { loading, setLoading } = UseLoadingStore();
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            if (!isLogin) {
                router.push('/loginPage');
            }
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [isLogin]);
    if (pathname === '/loginPage') return <>{children}</>;
    return loading ? <LoadingPage /> : <>{children}</>;
}