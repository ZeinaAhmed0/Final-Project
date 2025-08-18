import React from 'react'
import Image from 'next/image'

function ImgContainer({ img, imgAlt, className, width }) {
    return (
        <>
            <div className="img-container relative">
                <Image src={img} alt={imgAlt} className={className} width={width} />
            </div>
        </>
    )
}

export default ImgContainer