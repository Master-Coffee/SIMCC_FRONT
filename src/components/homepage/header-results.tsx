import { FadersHorizontal, MapTrifold } from "phosphor-react";
import { Button } from "../ui/button";
import { useModal } from "../hooks/use-modal-store";
import { useContext } from "react";
import { UserContext } from "../../context/context";

export function HeaderResult() {
    const {onOpen} = useModal()
    const { mapModal, setMapModal, sugestoes} = useContext(UserContext)
    return(
        <div className="flex items-center justify-between my-2">
            <div className="flex gap-3 items-center">
                <p className="text-sm font-medium">Sugestões:</p>
                {sugestoes.map(( props) => {
                    return(
                        <div   className={`flex gap-2 h-8 capitalize cursor-pointer transition-all bg-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 dark:bg-neutral-800 items-center p-2 px-3 rounded-md text-xs`} >
                        {props.term}
                    </div>
                )
                })}
            </div>

            
        </div>
    )
}