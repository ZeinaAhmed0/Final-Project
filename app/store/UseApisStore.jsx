'use client'
import { create } from "zustand"
import axios from "axios"
export const endPoint = 'http://localhost:1337/api/'
export const useApisStore = create((set ) => ({
    emp: [],
    fetchApi: async () => {
        try {
            const res = await axios.get(`${endPoint}employees`, {
                params :{
                populate: '*'
            }
            })
            set({ emp: res.data.data })
        } catch (err) {
            console.log(err)
        }
    }
}))