import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import logoNLW from "/logo.svg";
import { CreateAdvertisement } from "./components/CreateAdvertisement";
import { ModalAdvertisement } from "./components/ModalAdvertisement";
import { ContextCloseModal, ContextGames, ContextGetAdvertisement } from "./context/appContext";
import { Carosel } from "./components/Carosel";
import { Inputs } from "./components/Form";
import { Table } from "./components/Table";

export interface ListOfGames {
  id: string;
  title: string;
  bannerURL: string;
  _count: {
    Advertisements: number
  };
}

export function App() {
  const [listGames, setListGames] = useState<ListOfGames[]>([]);
  const [closeModal, setCloseModal] = useState<boolean>(false);
  const [state, dispatch] = useState<Inputs[]>([])

  useEffect(() => {
    fetch('http://localhost:5000/games')
      .then(res => res.json())
      .then(data => setListGames(data.games))
      .catch(err => console.log(err));
  }, []);
  
  return (
    <div className="max-w-[980px] w-full mx-auto flex flex-col justify-center items-center py-8 px-4">
      <img src={logoNLW} alt="logo" />

      <h1 className="text-3xl md:text-[64px] text-white font-black mt-20 text-center">
        O seu <span className="bg-nlwGradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <ContextGetAdvertisement.Provider value={{ state, dispatch }}>
        <Dialog.Root>
          <Carosel listOfGames={listGames} />

          <Dialog.Overlay className="dialogOverlay">
            <Dialog.Content className="max-h-max">
              <Table listOfAds={state}/>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Root>
      </ContextGetAdvertisement.Provider>

      <ContextGames.Provider value={listGames}>
        <ContextCloseModal.Provider value={{ closeModal, setCloseModal }}>
          <Dialog.Root open={closeModal} onOpenChange={setCloseModal}>
            <CreateAdvertisement />
            <ModalAdvertisement />
          </Dialog.Root>
        </ContextCloseModal.Provider>
      </ContextGames.Provider>
    </div>
  );
}