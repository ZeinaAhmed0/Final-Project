import React from 'react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import Aside from '../layout/Aside'
function LayoutProvider({ children }) {
    return (
        <>
            <Navbar />
            <div className="flex">
                <Aside />
                <div className="capitalize w-full">
                    {children}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default LayoutProvider