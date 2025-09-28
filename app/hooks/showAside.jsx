'use client';
import { create } from "zustand";

export const useAsideStore = create((set) => ({
    isAsideOpen: false,
    setIsAsideOpen: () => set((state) => ({ isAsideOpen: !state.isAsideOpen }))
}));

