import React from 'react'
import Image from 'next/image'

function ImgContainer({ img, imgAlt, className, mdWidth,  smWidth }) {
    return (
        <>
            <div className="img-container relative">
                <Image src={img} alt={imgAlt} className={`${className} ${mdWidth} ${smWidth}`} />
            </div>
        </>
    )
}

export default ImgContainer