'use client';
import { create } from "zustand";
import { endPoint } from "./UseApisStore";
import axios from "axios";

export const UseVacationStore = create((set) => ({
    vacations: [],
    approvedVacations: [],
    pendedVacations: [],
    fetchVac: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            const res = await axios.get(`${endPoint}vacations`, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ vacations: res.data.data });
            set({ approvedVacations: res.data.data.filter(vac => vac.approval !== null) });
            set({ pendedVacations: res.data.data.filter(vac => vac.approval !== false && vac.approval !== true) });
        } catch (error) {
            console.error("Failed to fetch vacations:", error);
        }
    },
    updateVacationStatus: async (documentId, approval) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }
            await axios.put(
                `${endPoint}vacations/${documentId}`,
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
        } catch (error) {
            console.error(`Failed to update vacation status for id ${documentId}:`, error);
        }
    },
    
}));
