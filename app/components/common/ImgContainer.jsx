import React from 'react'
import Image from 'next/image'

function ImgContainer({ img, imgAlt, className, mdWidth,  smWidth }) {
    return (
        <>
            <div className={`img-container relative ${mdWidth} ${smWidth}`}>
                <Image src={img} alt={imgAlt} className={className} priority={false}/>
            </div>
        </>
    )
}

export default ImgContainer