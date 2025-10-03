'use client'
import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import Aside from '../layout/Aside';
import { useAsideStore } from '@/app/hooks/showAside';
function LayoutProvider({ children }) {
    const { isAsideOpen, setIsAsideOpen } = useAsideStore();
    const toggleAside = () => {
        setIsAsideOpen(prev => !prev);
    };
    return (
        <>
            <Navbar toggleAside={toggleAside} />
            <div className="flex">
                <div className={`bg-[var(--color-primary)] py-2 z-50 transition-transform duration-300 fixed top-0 left-0 lg:relative lg:translate-x-0 ${isAsideOpen ? 'translate-x-0' : '-translate-x-full'} md:fixed  sm:fixed`}>
                    <Aside toggleAside={toggleAside} />
                </div>
                <div className='capitalize w-full bg-[var(--color-secondary)] transition-all duration-300'>
                    {children}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default LayoutProvider;
