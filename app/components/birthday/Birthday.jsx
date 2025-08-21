import React from 'react'
import HBD from '@/public/happy-birthday.webp'
import ImgContainer from '../common/ImgContainer'
function Birthday() {
  return (
    <>
      <div className='m-6 bg-white'>
        <h1 className='p-3'>today birthday</h1>
        <hr className='opacity-20' />
        <div className="flex">
          <ImgContainer img={HBD} imgAlt="happy birthday" className='fill' mdWidth='w-55' smWidth='w-40' />
          <table className="table border border-base-content/5">
            <thead>
              <tr>
                <th className='w-30'>Name</th>
                <th className='w-10'>department</th>
                <th className='w-5'>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="flex items-center lg:flex-row md:flex-col sm:flex-col gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="lg:font-bold md:font-semibold sm:font-semibold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td className='flex justify-center flex-col flex-wrap'>
                  <span className='lg:text-sm sm:text-xs'>Zemlak, Daniel and Leannon</span>
                  <br />
                  <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                </td>
                <td>Purple</td>
              </tr>
              <tr>
                <td>
                  <div className="flex items-center lg:flex-row md:flex-col sm:flex-col gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="lg:font-bold md:font-semibold sm:font-semibold">Brice Swyre</div>
                      <div className="text-sm opacity-50">China</div>
                    </div>
                  </div>
                </td>
                <td className='flex justify-center flex-col flex-wrap'>
                  <span className='lg:text-sm sm:text-xs'>Carroll Group</span>               
                  <br />
                  <span className="badge badge-ghost badge-sm">Tax Accountant</span>
                </td>
                <td>Red</td>
              </tr>
              <tr>
                <td>
                  <div className="flex items-center lg:flex-row md:flex-col sm:flex-col gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="lg:font-bold md:font-semibold sm:font-semibold">Marjy Ferencz</div>
                      <div className="text-sm opacity-50">Russia</div>
                    </div>
                  </div>
                </td>
                <td className='flex justify-center flex-col flex-wrap'>
                  <span className='lg:text-sm sm:text-xs'>Rowe-Schoen</span>                 
                  <br />
                  <span className="badge badge-ghost badge-sm">Office Assistant I</span>
                </td>
                <td>Crimson</td>
              </tr>
              <tr>
                <td>
                  <div className="flex items-center lg:flex-row md:flex-col sm:flex-col gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="lg:font-bold md:font-semibold sm:font-semibold">Yancy Tear</div>
                      <div className="text-sm opacity-50">Brazil</div>
                    </div>
                  </div>
                </td>
                <td className='flex justify-center flex-col flex-wrap'>
                  <span className='lg:text-sm sm:text-xs'>Wyman-Ledner</span>
                  <br />
                  <span className="badge badge-ghost badge-sm">Community Outreach Specialist</span>
                </td>
                <td>Indigo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Birthday