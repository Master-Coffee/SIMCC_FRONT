import { cn } from "../../lib";
import { useLocation, useNavigate } from "react-router-dom";

// HERE *I3.2*

interface InciteProgram {
  create_at: string;
  description: string;
  incite_graduate_program_id: string;
  institution_id: string;
  link: string;
  name: string;
  qtd_discente: string;
  updated_at: string;
  visible: string;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export function InciteProgramItem(props: InciteProgram) {
  const queryUrl = useQuery();
  const navigate = useNavigate();

  // Calcula a diferença em dias entre a data atual e a data do item

  const handlePesquisaFinal = () => {
    queryUrl.set("graduate_program_id", props.incite_graduate_program_id);
    navigate({
      pathname: "/pos-graduacao",
      search: queryUrl.toString(),
    });
  };

  return (
    <div
      className="flex items-center relative w-full"
      onClick={() => handlePesquisaFinal()}
    >
      <div className="flex w-full">
        <div
          className={"w-2 min-w-2 rounded-l-md dark:border-neutral-800 border border-neutral-200 border-r-0 min-h-full relative bg-green-800"}
        ></div>

        <button
          className={cn(
            "flex flex-col rounded-lg w-full rounded-l-none bg-white dark:bg-neutral-800 dark:border-neutral-700 items-start gap-2  border p-3 text-left text-sm transition-all hover:bg-accent"
          )}
        >
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="font-semibold text-lg">{props.name}</div>
              </div>
              <div></div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
