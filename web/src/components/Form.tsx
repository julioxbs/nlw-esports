import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import gameController from "/gamecontroller.svg"
import check from "/Check.svg";
import chevronDown from "/caretdown.svg";
import { useContext, useState } from "react";
import { ContextCloseModal, ContextGames } from "../context/appContext";
import { useForm } from "react-hook-form";

const weekdays: { [key: string]: string } = {
    "Domingo": "D",
    "Segunda": "S",
    "Terça": "T",
    "Quarta": "Q",
    "Quinta": "Q",
    "Sexta": "S",
    "Sabádo": "S",
}

export type Inputs = {
    name: string,
    game: string,
    yearsPlaying: string,
    discord: string,
    hourStart: string,
    hourEnd: string,
    useVoiceChannel: boolean,
    weekDays: string[],
    createdAt: string,
};

export function Form() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const listOfGames = useContext(ContextGames);
    const { closeModal, setCloseModal } = useContext(ContextCloseModal);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setValue] = useState<any>(false);
    const [containsWeekDays, setContainsWeekDays] = useState<boolean>(true);

    async function submitValues(data: Inputs) {
        const result = data;
        Object.assign(result, { "weekDays": weekDays }, { 'useVoiceChannel': useVoiceChannel });

        console.log(result.discord);
        if (result.weekDays.length > 0) {
            try {
                await axios.post(`http://localhost:5000/game/${result.game}/ads`, {
                    "name": result.name,
                    "yearsPlaying": result.yearsPlaying ? Math.abs(Number(result.yearsPlaying)) : 0,
                    "discord": result.discord === "" ? "Not informed" : result.discord,
                    "weekDays": Array.from(result.weekDays, Number),
                    "hourStart": result.hourStart,
                    "hourEnd": result.hourEnd,
                    "useVoiceChannel": result.useVoiceChannel
                });
                alert("Criado com sucesso");
                setCloseModal(!closeModal);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        } else {
            setContainsWeekDays(!containsWeekDays)
        }
    }

    return (
        <form onSubmit={handleSubmit(submitValues)} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2 relative">
                <label htmlFor="game" className={`text-sm ${errors.game && 'text-red-500'}`}>
                    {errors.game ? "Este campo deve ser preenchido" : "Selecione o game:"}
                </label>
                <img src={chevronDown} alt="arrow down" className="absolute w-5 h-5 top-10 right-5" />
                <select {...register('game', { required: true })} className="bg-zinc-900 py-3 px-4 rounded text-sm appearance-none cursor-pointer focus:outline-none focus:ring focus:ring-violet-300">
                    <option value={""} >Selecione o game</option>
                    {listOfGames.map((game, index) => {
                        return (
                            <option key={index} value={game.id}>{game.title}</option>
                        )
                    })}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="name" className={`text-sm ${errors.name && 'text-red-500'}`}>
                    {errors.name ? "Este campo deve ser preenchido" : "Digite seu nome:"}
                </label>
                <input {...register('name', { required: true })} className="input-style" placeholder="Seu nome dentro do game?" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying" className="text-sm">Joga há quantos anos?</label>
                    <input {...register('yearsPlaying')} className="input-style" min={0} type="number" placeholder="Tudo bem ser ZERO" />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="discord" className="text-sm">Qual seu o Discord?</label>
                    <input {...register('discord')} className="input-style" type="text" placeholder="Usuario#000" />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:gap-14 gap-6">
                <div className="flex flex-col gap-2">
                    <label className={`text-sm ${containsWeekDays ? "" : "text-red-500"}`}>Dias da semana:</label>
                    <ToggleGroup.Root type="multiple" value={weekDays} onValueChange={setWeekDays} className="grid sm:grid-cols-5 grid-cols-7 gap-1">
                        {Object.entries(weekdays).map(([key, value], index) => {
                            return (
                                <ToggleGroup.Item value={String(index)} key={index} className={`${key} w-8 rounded-md h-8 text-white font-bold focus:outline-none focus:ring focus:ring-violet-300 ${weekDays.includes(String(index)) ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                    {value}
                                </ToggleGroup.Item>
                            )
                        })}
                    </ToggleGroup.Root>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <span className="text-sm mb-1 block">Começo:</span>
                            <input className={`input-style focus:outline-none focus:ring ${errors.hourStart ? "focus:ring-red-500" : "focus:ring-violet-300"}`} {...register('hourStart', { required: true })} type="time" name="hourStart" id="hourStart" placeholder="De" />
                        </div>

                        <div>
                            <span className="text-sm mb-1 block">Término:</span>
                            <input className={`input-style focus:outline-none focus:ring ${errors.hourEnd ? "focus:ring-red-500" : "focus:ring-violet-300"}`} {...register('hourEnd', { required: true })} type="time" name="hourEnd" id="hourEnd" placeholder="Até" />
                        </div>
                    </div>
                </div>
            </div>

            <label className="mt-2 flex items-center gap-2 text-sm">
                <Checkbox.Root className="bg-zinc-900 w-6 h-6 rounded-sm p-1 focus:outline-none focus:ring focus:ring-violet-300" onCheckedChange={setValue}>
                    <Checkbox.Indicator>
                        <img src={check} alt="check" />
                    </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz?
            </label>

            <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close className="bg-zinc-500 py-3 px-5 rounded-md font-semibold focus:outline-none focus:ring focus:ring-violet-300">Cancelar</Dialog.Close>

                <button className="flex gap-2 bg-violet-500 py-3 px-5 rounded-md font-semibold hover:bg-violet-600 transition focus:outline-none focus:ring focus:ring-violet-300" type="submit">
                    <img src={gameController} alt="game controller" />
                    Publicar
                </button>
            </footer>
        </form>
    )
}