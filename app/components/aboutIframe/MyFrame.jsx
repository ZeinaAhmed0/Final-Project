'use client';
import React from 'react'

function Iframe() {
    return (
        <>
            <div tabIndex={0} className="collapse collapse-arrow bg-white">
                <div className="collapse-title lg:text-2xl md:text-xl sm:text-lg text-base font-semibold p-3">about the company</div>
                <div className="collapse-content m-5">
                    <iframe className='w-full h-[50rem]' src='https://www.youtube.com/embed/F8hiO6HcY2A?si=vhVZea_VAQA0eVz8' title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                </div>
            </div>
        </>
    )
}

export default Iframe