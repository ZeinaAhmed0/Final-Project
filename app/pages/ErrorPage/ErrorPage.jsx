import React from 'react'

function ErrorPage() {
    return (
        <>
            <div>
                <h1 className='text-4xl font-bold text-red-600 flex items-center justify-center w-full'>An error occurred while fetching the token. Please try again later.</h1>
            </div>
        </>
    )
}

export default ErrorPage