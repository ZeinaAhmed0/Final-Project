'use client';
import { create } from "zustand";
import { endPoint } from "./UseApisStore";
import axios from "axios";
import toast from "react-hot-toast";

export const UseReservationstore = create((set) => ({
    reservations: [],
    fetchReservation: async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                return;
            }
            const res = await axios.get(`${endPoint}reservations?pagination[pageSize]=100`, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ reservations: res.data.data });
        } catch (error) {
            toast.error('Failed to get reservations');
        }
    }
}));