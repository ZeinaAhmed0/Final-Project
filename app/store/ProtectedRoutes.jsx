'use client'
import { useEffect } from 'react'
import useAuthStore from '@/app/store/AuthStore';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/app/pages/LoadingPage/LoadingPage';
import { UseLoadingStore } from './UseLoadingStore';

export default function ProtectedRoute({ children }) {
    const router = useRouter()
    const { isLogin } = useAuthStore()
    const { loading, setLoading } = UseLoadingStore()
    useEffect(() => {
        if (!isLogin) {
            router.push('/loginPage')
        }
        else {
            setLoading(false);
            router.push('/')
        }
    }, [isLogin])
    if (loading) {
        return <LoadingPage />;
    }
    return (
        <>{children}</>
    );
}
