import React from 'react'

function LoadingPage() {
    return (
        <>
            <div>
                <h1 className='text-4xl font-bold text-red-600 flex items-center justify-center w-full'>loading...
                    <span className="loading loading-spinner text-neutral"></span>
                </h1>
            </div>
        </>
    )
}

export default LoadingPage