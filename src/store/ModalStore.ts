import { create } from "zustand";

interface Modalstate {
  isOpen: boolean;
  openModel: () => void;
  closeModel: () => void;
}

export const useModalStore = create<Modalstate>((set) => ({
  isOpen: false,
  openModel: () => set({ isOpen: true }),
  closeModel: () => set({ isOpen: false }),
}));
