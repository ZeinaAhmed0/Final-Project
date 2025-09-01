import React from 'react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import Aside from '../layout/Aside'
function LayoutProvider({ children }) {
    return (
        <>
            <Navbar />
            <div className="flex">
                <div className='lg:block md:block sm:hidden hidden bg-sky-700 py-2'>
                    <Aside />
                </div>
                <div className='capitalize w-full bg-sky-700'>
                    {children}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default LayoutProvider
