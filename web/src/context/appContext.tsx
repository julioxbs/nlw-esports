import { createContext } from "react";
import { Inputs } from "../components/Form";

interface gamesContextProps {
    title: string;
    id: string;
}

interface closeModalProps {
    closeModal: boolean;
    setCloseModal: (value: boolean) => void;
}

export const ContextGames = createContext<gamesContextProps[]>([]);
export const ContextCloseModal = createContext({} as closeModalProps);
export const ContextGetAdvertisement = createContext({
    state: [] as Inputs[],
    dispatch: (state: Inputs[]) => {}
});