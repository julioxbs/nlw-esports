import * as Dialog from "@radix-ui/react-dialog";
import { Form } from "./Form";

export function ModalAdvertisement() {
    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed overflow-y-auto flex items-center justify-center px-2 py-4">
                <Dialog.Content className="bg-[#2a2634] py-6 px-6 text-white rounded-lg max-h-max md:max-w-[490px] w-[600px] md:mt-0 mt-[15rem]">
                    <Dialog.Title className="text-3xl text-white font-black text-center">Publique um anúncio</Dialog.Title>
                    <Form />
                </Dialog.Content>
            </Dialog.Overlay>
        </Dialog.Portal>
    );
}