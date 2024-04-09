
import { useContext, useEffect } from "react";
import SearchLayout from "../layout/search-layout";
import { UserContext } from "../context/context";
import { GeralProvider } from "../components/provider/geral-provider";
import { useModalHomepage } from "../components/hooks/use-modal-homepage";
import { useLocation } from "react-router-dom";

export function Home() {
    const { onOpen } = useModalHomepage();
  

    return(
        <>
        <SearchLayout>
            <GeralProvider/>

        </SearchLayout>
        </>
    )
}