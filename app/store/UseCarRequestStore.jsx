'use client';
import { create } from "zustand";
import { endPoint } from "./UseApisStore";
import axios from "axios";

export const UseCarRequestStore = create((set) => ({
    CarRequests: [],
    approvedCarRequests: [],
    pendedCarRequests: [],
    fetchReq: async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                return;
            }
            const res = await axios.get(`${endPoint}car-requests`, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ CarRequests: res.data.data });
            set({ approvedCarRequests: res.data.data.filter(Req => Req.approval === true) });
            set({ pendedCarRequests: res.data.data.filter(Req => Req.approval !== false && Req.approval !== true) });
        } catch (error) {
            console.error("Failed to fetch CarRequestS:", error);
        }
    },
    updateCarRequestStatus: async (documentId, approval) => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                return;
            }
            await axios.put(
                `${endPoint}car-requests/${documentId}`,
                {
                    data: { approval: approval , approveDate:new Date().toISOString().split('T')[0] }
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (error){}
    },
    
}));