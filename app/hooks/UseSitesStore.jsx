'use client';
import { create } from "zustand";
import logo from '@/public/images/logo.png'
import filGoal from '@/public/images/filGoal.webp';
import EGas from '@/public/images/EGas.webp';
import ministry from '@/public/images/MinistryOfPetroleum.png';
import wikipedia from '@/public/images/wikipedia.png';
import yallaKora from '@/public/images/yallakora.webp';
import youm7 from '@/public/images/youm7.webp';
import bbc from '@/public/images/BBC.webp';
export const useSitesStore = create(set => ({
    newsSites: [
        {
            id: 1,
            name: 'BBC Arabic',
            img: bbc,
            category: 'news sites',
            url: 'https://www.bing.com/ck/a?!&&p=b3851ef7103d64e205c339e7476e78e390192844c99aa4ce1b98673ed1b3ad74JmltdHM9MTc1NTgyMDgwMA&ptn=3&ver=2&hsh=4&fclid=0cf078ca-1bd0-6628-1389-6ee21aac6723&psq=bbc+arabic&u=a1aHR0cHM6Ly93d3cuYmJjLmNvbS9hcmFiaWM&ntb=1'
        },
        {
            id: 2,
            name: 'youm7',
            img: youm7 ,
            category: 'news sites',
            url: 'https://www.bing.com/ck/a?!&&p=8f7e748e8e6fadefc92e27fbe2751f303701ec666de2da6a50550f52e4c6bd9eJmltdHM9MTc1NTgyMDgwMA&ptn=3&ver=2&hsh=4&fclid=0cf078ca-1bd0-6628-1389-6ee21aac6723&psq=+%d8%a7%d9%84%d9%8a%d9%88%d9%85+%d8%a7%d9%84%d8%b3%d8%a7%d8%a8%d8%b9&u=a1aHR0cHM6Ly93d3cueW91bTcuY29tLw&ntb=1'
        },
    ],
    setNewSites: () => set(state => ({ newsSites: newsSites })),
    sisterCompanies: [
        {
            id: 1,
            name: 'EGAS official Facebook page',
            img: EGas ,
            category: 'sister companies',
            url: 'https://www.bing.com/ck/a?!&&p=8100ab6353022c3e64a9dec0418d54bc306820bc0d121d2d328c5df0fad786f7JmltdHM9MTc1NTgyMDgwMA&ptn=3&ver=2&hsh=4&fclid=0cf078ca-1bd0-6628-1389-6ee21aac6723&psq=egas+egypt&u=a1aHR0cHM6Ly93d3cuZWdhcy5jb20uZWcv&ntb=1'
        },
        {
            id: 2,
            name: 'The Ministry of Petroleum website',
            img: ministry ,
            category: 'sister companies',
            url: 'https://intranet.petroleum.gov.eg/login'
        },
    ],
    setSisterCompanies: () => set(state => ({ sisterCompanies: sisterCompanies })),
    sportsSites: [
        {
            id: 1,
            name: 'fil goal',
            img: filGoal,
            category: 'sports sites',
            url: 'https://www.bing.com/ck/a?!&&p=33b6f28d6e9cb1a5c6416708f67fb2926242d51aaa5d457a50ece36f225dbc73JmltdHM9MTc1NTgyMDgwMA&ptn=3&ver=2&hsh=4&fclid=0cf078ca-1bd0-6628-1389-6ee21aac6723&psq=%d9%81%d9%8a+%d8%a7%d9%84%d8%ac%d9%88%d9%84&u=a1aHR0cHM6Ly93d3cuZmlsZ29hbC5jb20vP3RvcD10cnVl&ntb=1'
        },
        {
            id: 2,
            name: 'yalla kora',
            img:  yallaKora ,
            category: 'sports sites',
            url: 'https://www.bing.com/ck/a?!&&p=af8ca26f2cd1e41a0f6f933076177f0d244331b9dcef85202435db0cc3a617aeJmltdHM9MTc1NTgyMDgwMA&ptn=3&ver=2&hsh=4&fclid=0cf078ca-1bd0-6628-1389-6ee21aac6723&psq=%d9%8a%d9%84%d8%a7+%d9%83%d9%88%d8%b1%d8%a9+&u=a1aHR0cHM6Ly9rb3Jhb24uY29tL3lhbGxhLWtvcmEtbmV3LTMyOTI5Lw&ntb=1',
        },
    ],
    setSportsSites: () => set(state => ({ sportsSites: sportsSites })),
    ourSites:[
        {
        id: 1,
        name: "the company's official website",
        img:logo,
        category: "the company's sites",
        url: '#'
    },
    {
        id: 2,
        name: "the company's official facebook page",
        img: logo,
        category: "the company's sites",
        url: '#'
    },
    ],
    setOurSites: () => set(state => ({ ourSites: ourSites })),
    documentarySites: [
        {
        id: 1,
        name: 'wikipedia',
        img: wikipedia,
        category: 'documentary sites',
        url: 'https://www.bing.com/ck/a?!&&p=7da8329b34da32330d7215e4ac19f1dd5c08f339f435f7b13d1764455ded1a0aJmltdHM9MTc1NTgyMDgwMA&ptn=3&ver=2&hsh=4&fclid=0cf078ca-1bd0-6628-1389-6ee21aac6723&psq=wikipedia&u=a1aHR0cHM6Ly93d3cud2lraXBlZGlhLm9yZy8&ntb=1'
    }
    ],
    setDocumentarySites: () => set(state => ({ documentarySites: documentarySites })),
}))
