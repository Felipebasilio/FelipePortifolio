import { create } from "zustand";

export interface CardDetailsState {
  stackKey: string | null;
  stackBackgroundColor: string | null;
  setCardDetails: (details: {
    stackKey: string;
    stackBackgroundColor: string;
  }) => void;
  resetCardDetails: () => void;
}

export const useCardDetailsStore = create<CardDetailsState>((set) => ({
  stackKey: null,
  stackBackgroundColor: null,
  setCardDetails: (details) =>
    set({
      stackKey: details.stackKey,
      stackBackgroundColor: details.stackBackgroundColor,
    }),
  resetCardDetails: () =>
    set({
      stackKey: null,
      stackBackgroundColor: null,
    }),
}));
 