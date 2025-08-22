'use client';
import { useSitesStore } from '@/app/store/UseSitesStore'
import React from 'react'
import ImgContainer from '../common/ImgContainer';

function SitesContainer() {
    const { documentarySites, sportsSites, newsSites, ourSites, sisterCompanies } = useSitesStore()
    return (
        <>
            <div className="grid grid-cols-2 gap-5 m-8">
                <div className='bg-white '>
                    {
                        ourSites.map((site, index) => (
                            <div key={site.id}>
                                <div className={index == 0 ? '' :'hidden'}>
                                    <h1 className='p-4'>{site.category}</h1>
                                <hr className='opacity-20' />
                                </div>
                                <div className='p-4 flex items-center gap-2'>
                                    <ImgContainer img={site.img} imgAlt={site.name} className='fill' mdWidth='w-20' smWidth='w-15' />
                                    <a href={site.url}>{site.name}</a>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='bg-white'>
                    {
                        sportsSites.map((site, index) => (
                            <div key={site.id}>
                                <div className={index == 0 ? '' :'hidden'}>
                                    <h1 className='p-4'>{site.category}</h1>
                                <hr className='opacity-20' />
                                </div>
                                <div className='p-4 flex items-center gap-2'>
                                    <ImgContainer img={site.img} imgAlt={site.name} className='fill' mdWidth='w-20' smWidth='w-15' />
                                    <a href={site.url}>{site.name}</a>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='bg-white'>
                    {
                        sisterCompanies.map((site, index) => (
                            <div key={site.id}>
                                <div className={index == 0 ? '' :'hidden'}>
                                    <h1 className='p-4'>{site.category}</h1>
                                <hr className='opacity-20' />
                                </div>
                            <div className='p-4 flex items-center gap-2'>
                                <ImgContainer img={site.img} imgAlt={site.name} className='fill' mdWidth='w-20' smWidth='w-15' />
                                <a href={site.url}>{site.name}</a>
                            </div>
                            </div>
                        ))
                    }
                </div>
                <div className='bg-white'>
                    {
                        newsSites.map((site, index) => (
                            <div key={site.id}>
                                <div className={index == 0 ? '' :'hidden'}>
                                    <h1 className='p-4'>{site.category}</h1>
                                <hr className='opacity-20' />
                                </div>
                            <div className='p-4 flex items-center gap-2'>
                                <ImgContainer img={site.img} imgAlt={site.name} className='fill' mdWidth='w-20' smWidth='w-15' />
                                <a href={site.url}>{site.name}</a>
                            </div>
                            </div>
                        ))
                    }
                </div>
                <div className='bg-white'>
                    {
                        documentarySites.map((site, index) => (
                            <div key={site.id}>
                                <div className={index == 0 ? '' :'hidden'}>
                                    <h1 className='p-4'>{site.category}</h1>
                                <hr className='opacity-20' />
                                </div>
                            <div className='p-4 flex items-center gap-2'>
                                <ImgContainer img={site.img} imgAlt={site.name} className='fill' mdWidth='w-20' smWidth='w-15' />
                                <a href={site.url}>{site.name}</a>
                            </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default SitesContainer