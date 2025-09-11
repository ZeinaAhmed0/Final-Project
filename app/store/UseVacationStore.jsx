'use client';
import { create } from "zustand";
import { endPoint } from "./UseApisStore";
import axios from "axios";

export const UseVacationStore = create((set) => ({
    vacations: [],
    fetchVac: async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${endPoint}vacations`, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ vacations: res.data.data });
        } catch (error) {
            console.error("Failed to fetch vacations:", error);
        }
    },
    updateVacationStatus: async (documentId, approval) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${endPoint}vacations/${documentId}`,
                {
                    data: { approval: approval }
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
