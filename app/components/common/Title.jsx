import React from 'react'

function Title({title, bg, textColor}) {
    return (
        <>
            <h1 className={`lg:text-2xl md:text-xl sm:text-lg text-base p-5 font-semibold ${textColor} ${bg}`}>{title}</h1>
        </>
    )
}

export default Title