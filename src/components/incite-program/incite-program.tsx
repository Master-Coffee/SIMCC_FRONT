import { useEffect, useState } from "react";

import { useModalHomepage } from "../hooks/use-modal-homepage";

import { InciteProgramItem } from "./incite-program-item";

import { VisualizacaoPrograma } from "./visualizacao-programa";

import { Link, useLocation } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { Alert } from "../ui/alert";
import { MagnifyingGlass } from "phosphor-react";
import { Input } from "../ui/input";
import { ArrowRight, Info } from "lucide-react";

import bg_graduate from "../../assets/bg_graduate.png";

// HERE *I3*

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

export function InciteProgram() {
  const urlLocal = "http://127.0.0.1:8080/";
  const urlInciteProgram = `${urlLocal}incite_program_profnit?id=`;

  const { isOpen, type } = useModalHomepage();

  const queryUrl = useQuery();

  const type_search = queryUrl.get("incite_graduate_program_id");

  const isModalOpen = isOpen && type === "incite-home";

  // ✪ [graduatePrograms, setGraduatePrograms]
  const [graduatePrograms, setGraduatePrograms] = useState<InciteProgram[]>([]);

  const inciteSelecionado = type_search || "";
  const [search, setSearch] = useState("");

  useEffect(() => {
    // _PIN_  ✉ Incite

    const fetchData = async () => {
      try {
        const response = await fetch(urlInciteProgram, {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
            "Content-Type": "text/plain",
          },
        });
        const data = await response.json();
        if (data) {
          console.log("data :", data); // [LOG] data
          setGraduatePrograms(data);
        }
      } catch (err) {
        console.log("err : ", err);
      }
    };

    fetchData();
  }, [urlInciteProgram]);

  const filteredTotal = Array.isArray(graduatePrograms)
    ? graduatePrograms.filter((item) => {
        // Normaliza a string do item e da busca para comparação
        const normalizeString = (str: any) =>
          str
            .normalize("NFD") // Decompõe os caracteres acentuados
            .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos
            .toLowerCase(); // Converte para minúsculas

        const searchString = normalizeString(item.name);
        const normalizedSearch = normalizeString(search);

        return searchString.includes(normalizedSearch);
      })
    : [];

  return (
    <>
      {isModalOpen && (
        <>
          {inciteSelecionado.length == 0 ? (
            <main className="  gap-4 md:gap-8 flex flex-col  p-4 md:p-8 pt-0 md:pt-0 w-full">
              <div
                className="bg-cover bg-bottom bg-no-repeat"
                style={{ backgroundImage: `url(${bg_graduate})` }}
              >
                <div className="justify-center m w-full  flex max-w-[980px] flex-col items-center lg:items-start  gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
                  <Link
                    to={"/informacoes"}
                    className="inline-flex z-[2] w-fit items-center rounded-lg  bg-neutral-100 dark:bg-neutral-700  gap-2  px-3 py-1 text-sm font-medium"
                  >
                    <Info size={12} />
                    <div className="h-full w-[1px] bg-neutral-200 dark:bg-neutral-800"></div>
                    Saiba como utilizar a plataforma
                    <ArrowRight size={12} />
                  </Link>

                  <h1 className="z-[2] lg:text-left text-center max-w-[500px] text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]  md:block mb-4 ">
                    Selecione um programa do{" "}
                    <strong className="bg-[#82AAC0]  rounded-md px-3 pb-2 text-white font-medium">
                      {" "}
                      Incite
                    </strong>{" "}
                  </h1>

                  <Alert className="h-14 mt-8 p-2 flex items-center justify-between lg:max-w-[600px] lg:w-[60vw] w-full">
                    <div className="flex items-center gap-2 w-full flex-1">
                      <MagnifyingGlass
                        size={16}
                        className=" whitespace-nowrap w-10"
                      />
                      <Input
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        type="text"
                        className="border-0 w-full "
                      />
                    </div>

                    <div className="w-fit"></div>
                  </Alert>
                </div>
              </div>

              <ResponsiveMasonry
                columnsCountBreakPoints={{
                  350: 1,
                  750: 2,
                  900: 2,
                  1200: 3,
                  1700: 4,
                }}
              >
                <Masonry gutter="16px" className="w-full">
                  {filteredTotal
                    .filter((item) => item.visible == "True") // Filtra os itens onde `visible` é `true`
                    .map((props, index) => (
                      <InciteProgramItem
                        key={index} // Adiciona uma chave para cada item
                        create_at={props.create_at}
                        description={props.description}
                        incite_graduate_program_id={
                          props.incite_graduate_program_id
                        }
                        institution_id={props.institution_id}
                        link={props.link}
                        name={props.name}
                        qtd_discente={props.qtd_discente}
                        updated_at={props.updated_at}
                        visible={props.visible}
                      />
                    ))}
                </Masonry>
              </ResponsiveMasonry>
            </main>
          ) : (
            <>🦀</>
          )}
        </>
      )}
    </>
  );
}
