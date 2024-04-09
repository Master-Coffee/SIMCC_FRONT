import { useModalResult } from "../hooks/use-modal-result";

interface Props {
    title: string,
    children: any,
    type: string,
    on: boolean,
}

export function CategoriasItemHome(props: Props) {
    return (
        <div className={`rounded-full px-6 py-2 flex gap-3 transition-all cursor-pointer items-center ${
            (props.on && props.type === 'article') && 'bg-blue-500 dark:bg-blue-500' ||
            (props.on && props.type === 'abstract') && 'bg-yellow-500 dark:bg-yellow-500' ||
            (props.on && props.type === 'speaker') && 'bg-orange-500 dark:bg-orange-500' ||
            (props.on && props.type === 'book') && 'bg-pink-500 dark:bg-pink-500' ||
            (props.on && props.type === 'patent') && 'bg-cyan-500 dark:bg-cyan-500' ||
            (props.on && props.type === 'name') && 'bg-red-500 dark:bg-red-500' ||
            (props.on && props.type === 'area') && 'bg-green-500 dark:bg-green-500' ||
            (!props.type && 'hover:bg-gray-200 dark:hover:bg-black')
        }`}>
            {props.children}<p className="text-gray-700 dark:text-white text-sm">{props.title}</p>
        </div>
    );
}