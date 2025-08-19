import React from 'react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import Aside from '../layout/Aside'
function LayoutProvider({ children }) {
    return (
        <>
            <Navbar />
            {/* <Aside /> */}
            {children}
            <Footer />
        </>
    )
}

export default LayoutProvider