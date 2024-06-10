"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export type SortContextProps = {};

type ProviderProps = {
	children: React.ReactNode;
};

type SortCardOptions = {
	sortBy: string;
	sortOrder: string;
};

export const SortContext = createContext<SortContextProps>({});

export function SortContextProvider({ children }: ProviderProps) {
	// const [openCard, setOpenCard] = useState<OpenCardId>(null);

	return <SortContext.Provider value={{}}>{children}</SortContext.Provider>;
}
