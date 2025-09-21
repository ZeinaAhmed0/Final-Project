import React from 'react'
import Image from 'next/image'

function ImgContainer({ img, imgAlt, className, mdWidth,  smWidth, height }) {
    return (
        <>
            <div className={`img-container relative ${mdWidth} ${smWidth} ${height}`}>
                <Image src={img} alt={imgAlt} className={`${className} object-contain`} priority={false} layout="fill"/>
            </div>
        </>
    )
}

export default ImgContainer