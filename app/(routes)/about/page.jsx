import React from 'react'
import { IoMdPlayCircle } from "react-icons/io";

const About = () => {
  return (
    <>
      <div className='bg-white p-8'>
        <div className='flex items-center gap-1'>
          <div className='rotate-90 text-2xl'><IoMdPlayCircle /></div>
          <h1 className='text-2xl font-semibold p-3'>about the company</h1>
        </div>
        <div className='m-5'>
        <video src="https://www.youtube.com/watch?v=F8hiO6HcY2A&embeds_referring_euri=https%3A%2F%2Fintranet.petroleum.gov.eg%2F&source_ve_path=Mjg2NjY" controls autoPlay className='w-full h-lvh'></video>
        </div>
      </div> 
    </>
  )
}

export default About
