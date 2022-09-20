import { Inputs } from "./Form";

export function Table(props: { listOfAds: Inputs[] }) {
    function convert(val: string) {
        var date = new Date(val);
        return date.toISOString().substring(0, 10);
    }

    function transformToDaysOfWeek(week: string[]) {
        return week.map(day => {
            switch (day) {
                case "0": return "Seg ";
                case "1": return "Ter ";
                case "2": return "Qua ";
                case "3": return "Qui ";
                case "4": return "Sex ";
                case "5": return "Sab ";
                case "6": return "Dom ";
            }
        })
    }

    return (
        <div className="overflow-x-auto w-full relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                {props.listOfAds.length < 1 ? (<h1 className="text-red-600 text-3xl font-bold">Não há anúncios</h1>) : (<thead className="text-xs text-white uppercase bg-violet-500 ">
                    <tr>
                        <th scope="col" className="py-3 px-6">Nome</th>
                        <th scope="col" className="py-3 px-6">Inicio / Fim</th>
                        <th scope="col" className="py-3 px-6">Dias da semana</th>
                        <th scope="col" className="py-3 px-6">Usa microfone</th>
                        <th scope="col" className="py-3 px-6">Tempo de jogo</th>
                        <th scope="col" className="py-3 px-6">Discord</th>
                        <th scope="col" className="py-3 px-6">Criado em</th>
                    </tr>
                </thead>)}
                <tbody>
                    {props.listOfAds.map(val => {
                        return (
                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 text-center">
                                <th scope="row" className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {val.name}
                                </th>
                                <td className="py-4 px-6">
                                    {`${val.hourStart} / ${val.hourEnd}`}
                                </td>
                                <td className="py-4 px-6">
                                    {transformToDaysOfWeek(val.weekDays)}
                                </td>
                                <td className="py-4 px-6">
                                    {val.useVoiceChannel ? "Sim" : "Não"}
                                </td>
                                <td className="py-4 px-6">
                                    {`${val.yearsPlaying} ano(s)`}
                                </td>
                                <td className="py-4 px-6">
                                    {val.discord}
                                </td>
                                <td className="py-4 px-6">
                                    {convert(val.createdAt)}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}