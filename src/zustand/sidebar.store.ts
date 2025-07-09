import { create } from 'zustand';

interface SidebarType {
    isOpen: boolean;
    setIsOpen: (value?: boolean) => void;
}

export const useSidebarStore = create<SidebarType>((set) => ({
    isOpen: false,
    setIsOpen: (value) =>
        set((state) => ({
            isOpen: typeof value === 'boolean' ? value : !state.isOpen,
        })),
}));
