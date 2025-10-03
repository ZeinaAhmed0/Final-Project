import React from 'react'

function TableTh({ children }) {
    return (
        <th className='border border-gray-300 px-4 py-2 text-center lg:text-[1rem] md:text-sm sm:text-xs text-[0.8rem]'>{children}</th>
    )
}

export default TableTh