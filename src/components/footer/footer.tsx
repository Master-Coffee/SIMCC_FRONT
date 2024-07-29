import { Copyright } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Footer() {
    const [dataModificacao, setDataModificacao] = useState('');

  useEffect(() => {
    const dataAtual = new Date();
    const dataFormatada = `${dataAtual.getDate()}/${dataAtual.getMonth() + 1}/${dataAtual.getFullYear()}`;

    
    setDataModificacao(dataFormatada);
  }, []);

    return(
        <div className="w-full flex items-center  bg-neutral-50 dark:bg-neutral-900 justify-between py-2 border-t dark:border-t-neutral-800 px-4">
            <div className="flex items-center gap-2">
                <Copyright size={10}/>
            <p className="flex text-[10px] gap-1">Sistema de mapeamento de competências da <Link to={'https://www.eng.ufmg.br/'}>Escola de Engenharia </Link>| <Link to={'https://ufmg.br/'}>UFMG</Link></p>
            </div>

            <div>
            <p className="flex text-[10px]">Atualizado em {dataModificacao}</p>
            </div>
        </div>
    )
}