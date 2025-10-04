'use client';
import { create } from "zustand";
import { endPoint } from "./UseApisStore";
import axios from "axios";
import toast from "react-hot-toast";

export const UseOrderStore = create((set) => ({
    orders: [],
    fetchOrders: async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                return;
            }
            const res = await axios.get(`${endPoint}work-orders?pagination[pageSize]=100`, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ orders: res.data.data});
        } catch (error) {
            toast.error('error had occurred. please refresh the site');
        }
    },
}));