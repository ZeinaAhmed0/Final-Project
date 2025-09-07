'use client';
import { create } from 'zustand';
import axios from 'axios';
import { endPoint } from './UseApisStore';

export const UseEmpInformationStore = create((set) => ({
    userData: null,
    fetchUser: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            set({ userData: null });
            return;
        }
        try {
            const userRes = await axios.get(`${endPoint}users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const userEmail = userRes.data?.email;
            const empRes = await axios.get(`${endPoint}employees`, {
                params: {
                    filters: { employeeEmail: { $eq: userEmail } },
                },
                headers: { Authorization: `Bearer ${token}` },
            });
            const employeeData = empRes.data?.data;
            if (!employeeData || employeeData.length === 0) {
            }
            set({ userData: employeeData});
        } catch (error) {
            set({ userData: null});
        }
    },
}));