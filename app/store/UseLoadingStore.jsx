'use client';
import { create } from "zustand";

export const UseLoadingStore = create((set) => ({
    loading: false,
    setLoading: (value) => set({ loading: value }),
}));
