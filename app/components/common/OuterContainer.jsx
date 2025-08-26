import React from 'react'
function OuterContainer({children}) {
    return (
        <>
            <div className='bg-gray-200 p-4'>{children}</div>
        </>
    )
}

export default OuterContainer
