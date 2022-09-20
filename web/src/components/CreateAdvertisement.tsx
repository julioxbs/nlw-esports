import glassPlus from "/magnifyingglassplus.svg";
import * as Dialog from "@radix-ui/react-dialog";

export function CreateAdvertisement() {
    return (
        <div className="pt-1 bg-nlwGradient self-stretch rounded-lg overflow-hidden mt-8">
            <div className="bg-[#2A2634] px-8 py-6 flex flex-col sm:flex-row justify-between sm:items-center items-start gap-3">
                <div>
                    <strong className="text-2xl text-white font-black block">Não encontrou seu duo?</strong>
                    <p className="text-zinc-400 block">Publique um anúncio</p>
                </div>

                <Dialog.Trigger className="bg-violet-500 hover:bg-violet-700 rounded-md py-3 px-4 text-white flex items-center gap-3 transition">
                    <img src={glassPlus} alt="glass plus" />
                    Publicar anúncio
                </Dialog.Trigger>
            </div>
        </div>
    );
}