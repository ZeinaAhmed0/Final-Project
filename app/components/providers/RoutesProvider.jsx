// 'use client'
// import useAuthStore from '@/app/store/AuthStore';
// import ProtectedRoute from '@/app/store/ProtectedRoutes';
// import React, { useEffect } from 'react';
// import LayoutProvider from './LayoutProvider';
// import { useRouter } from 'next/navigation';
// import LoadingPage from '@/app/pages/LoadingPage/LoadingPage';
// function RoutesProvider({ children }) {
//     const { isLogin } = useAuthStore();
//     const router = useRouter();

//     useEffect(() => {
//         if (!isLogin) {
//             router.push('/loginPage');
//         }
//     }, [isLogin]);

//     if (!isLogin) {
//         return <LoadingPage/>;
//     }
//     return (
//         <ProtectedRoute>
//             <LayoutProvider>
//                 {children}
//             </LayoutProvider>
//         </ProtectedRoute>
//     );
// }

// export default RoutesProvider;
