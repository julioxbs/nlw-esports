import * as Dialog from "@radix-ui/react-dialog";
import { useContext } from "react";
import { ContextGetAdvertisement } from "../context/appContext";

interface bannerProps {
    id: string;
    title: string;
    bannerURL: string;
    adsCount: number;
}

export function GamerBanner({title, bannerURL, adsCount, id}: bannerProps) {
    const {dispatch, state} = useContext(ContextGetAdvertisement);

    console.log(state)

    async function getCurrentAdsOfGame(id: string) {
        await fetch(`http://localhost:5000/games/${id}/ads`)
              .then(res => res.json())
              .then(ads => {
                dispatch(ads);
                console.log(state)
              })
              .catch(err => console.log(err))
    }

    return (
        <Dialog.Trigger onClick={() => getCurrentAdsOfGame(id)} className="relative rounded-lg overflow-hidden keen-slider__slide">
            <img src={bannerURL} alt={title} />

            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute right-0 left-0 bottom-0">
                <strong className="font-bold text-white block">{title}</strong>
                <span className="text-zinc-300 text-sm block">{adsCount} anúncio(s)</span>
            </div>
        </Dialog.Trigger>
    );
}