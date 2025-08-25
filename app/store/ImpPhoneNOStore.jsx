'use client';
import { create } from "zustand";

export const useImpPhoneNOStore = create(set => ({
    impPhoneNO: [{
        id: 1,
        number: 123,
        title:'Ambulance Number',
    },
    {
        id: 2,
        number: 122,
        title:'Emergency Police Number',
    },
    {
        id: 3,
        number:180,
        title:'Fire Department Number',
    },
    {
        id: 4,
        number: 121,
        title:'	Electricity Faults Number',
    },
    {
        id: 5,
        number: 129,
        title:'Gas Emergency Number',
    },
    {
        id: 6,
        number: 126,
        title:'Tourism Police Number',
    },
    {
        id: 7,
        number: 141,
        title:'	Telephone Directory',
    },
    {
        id: 8,
        number: 115,
        title:'Public Reports – General Security Sector',
    }
],
    setImpPhoneNO: (impPhoneNO) => set({ impPhoneNO })
}))