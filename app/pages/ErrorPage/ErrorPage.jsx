'use client'
import React from 'react'
import dynamic from 'next/dynamic';
function ErrorPage() {
    const LottiePlayer = dynamic(
        () =>
            import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
        { ssr: false }
    );
    return (
        <>
            <div className='flex justify-center items-center h-screen overflow-hidden'>
                    <LottiePlayer autoplay loop src="/animation/404ErrorPageFiles.json" className='lg:min-w-8/12 md:w-10/12 sm:w-11/12 w-12/12 h-screen' />
            </div>
        </>
    )
}
export default ErrorPage