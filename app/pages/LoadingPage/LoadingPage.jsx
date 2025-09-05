'use client'
import React from 'react'
import dynamic from 'next/dynamic';
function LoadingPage() {
    const LottiePlayer = dynamic(
        () =>
            import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
        { ssr: false }
    );
    return (
        <>
            <div className='flex justify-center items-center h-screen w-screen'>
                    <LottiePlayer autoplay loop src="/LoadingFiles.json" className='w-full h-full' />
            </div>
        </>
    )
}

export default LoadingPage