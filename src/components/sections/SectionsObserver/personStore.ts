"use client";
import { create } from "zustand";

type SectionLayout = {
  offsetTop: number;
  width: number;
  height: number;
};

type State = {
  activeSection: string | null;
  sectionsLayout: Record<string, SectionLayout>;
  setActiveSection: (id: string) => void;
  setSectionLayout: (id: string, layout: SectionLayout) => void;
};

export const usePersonStore = create<State>((set) => ({
  activeSection: null,
  sectionsLayout: {},
  setActiveSection: (id) => set({ activeSection: id }),
  setSectionLayout: (id, layout) =>
    set((state) => ({
      sectionsLayout: { ...state.sectionsLayout, [id]: layout },
    })),
}));