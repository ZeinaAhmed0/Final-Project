'use client'
import { create } from "zustand"
import axios from "axios"

export const useApisStore = create((set) => ({
    endPoint: 'http://localhost:1337/api/',
    setEndPoint: (newEndPoint) => set({ endPoint: newEndPoint }),
    data: [],
    fetchApi: async () => {
        try {
            const res = await axios.post('http://localhost:1337/api/employees')
            const employees = res.data
            data.push(employees)
            console.log(employees)
        } catch (err) {
            console.log(err)
        }
    }
}))