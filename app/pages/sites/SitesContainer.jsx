'use client';
import { useSitesStore } from '@/app/store/UseSitesStore';
import React from 'react';
import ImgContainer from '../../components/common/ImgContainer';
import Link from 'next/link';

function SitesGroup({ sites }) {
    if (!sites || sites.length === 0) return null;

    return (
        <div className="bg-white">
            {sites.map((site, index) => (
                <div key={site.id}>
                    {index === 0 && (
                        <>
                            <h1 className="p-4">{site.category}</h1>
                            <hr className="opacity-20" />
                        </>
                    )}
                    <div className="p-4 flex items-center gap-2">
                        <ImgContainer
                            img={site.img}
                            imgAlt={site.name}
                            className="fill"
                            mdWidth="w-20"
                            smWidth="w-15"
                            height="h-15"
                        />
                        <Link href={site.url}>{site.name}</Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

function SitesContainer() {
    const {
        ourSites,
        sportsSites,
        sisterCompanies,
        newsSites,
        documentarySites,
    } = useSitesStore();

    return (
        <div className="grid grid-cols-2 gap-5 m-8">
            <SitesGroup sites={ourSites} />
            <SitesGroup sites={sportsSites} />
            <SitesGroup sites={sisterCompanies} />
            <SitesGroup sites={newsSites} />
            <SitesGroup sites={documentarySites} />
        </div>
    );
}

export default SitesContainer;
