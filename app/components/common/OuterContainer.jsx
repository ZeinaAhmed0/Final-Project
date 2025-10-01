import React from 'react'
function OuterContainer({children}) {
    return (
        <>
            <div className='bg-(--color-secondary) p-4'>{children}</div>
        </>
    )
}

export default OuterContainer
