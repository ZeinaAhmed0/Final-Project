import React from 'react'

function Title({title, bg}) {
    return (
        <>
            <h1 className={`lg:text-2xl md:text-xl text-xl p-5 font-semibold ${bg}`}>{title}</h1>
        </>
    )
}

export default Title