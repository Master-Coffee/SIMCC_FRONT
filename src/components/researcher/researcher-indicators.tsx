import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/context";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { GraduationCap, Info, MapPin, OctagonAlert } from "lucide-react";
import { FilterYearPopUp } from "../popup/filters-year-popup";
import { FilterYearIndicators } from "./filter-year-indicators";
import { GraficoIndiceArticle } from "./gráficos/grafico-indice-artigo";
import { GraficoIndiceBooksAndChapters } from "./gráficos/grafico-indice-livros";
import { IdentificationBadge, PuzzlePiece } from "phosphor-react";
import { Link } from "react-router-dom";

type Dados = {
    count_article:number
    count_book:number
    count_book_chapter:number,
    count_guidance:number
    count_patent:number
    count_report:number
    count_software:number
    count_guidance_complete:number
    count_guidance_in_progress:number
    count_patent_granted:number
    count_patent_not_granted:number
    count_brand:number
    graduantion:string
    year:number

    A1:number
  A2:number
  A3:number 
  A4:number
  B1:number 
  B2:number
  B3:number
  B4:number 
  C:number
  SQ:number
  }

  type PesosProducao = {
    a1: string;
    a2: string;
    a3: string;
    a4: string;
    b1: string;
    b2: string;
    b3: string;
    b4: string;
    c: string;
    sq: string;
    t1: string;
    t2: string;
    t3: string;
    t4: string;
    t5: string;
    livro: string;
    cap_livro: string;
    software: string;
    patente_concedida: string;
    patente_nao_concedida: string;
    rel_tec: string;
  };
  


  type Research = {
    among: number,
    articles: number,
    book: number,
    book_chapters: number,
    id: string,
    name: string,
    university: string,
    lattes_id: string,
    area: string,
    lattes_10_id: string,
    abstract: string,
    city: string,
    orcid: string,
    image: string
    graduation: string,
    patent: string,
    software: string,
    brand: string,
    lattes_update: Date,
    entradanaufmg:Date

    h_index:string,
    relevance_score:string,
    works_count:string,
    cited_by_count:string,
    i10_index:string,
    scopus:string,
    openalex:string,
  
    subsidy:Bolsistas[]
    graduate_programs:GraduatePrograms[]
    departments:Departments[]
    research_groups:ResearchGroups[]
  
    cargo:string
    clas:string
    classe:string
    rt:string
    situacao:string

    year_filter:string
  }
  
  interface Bolsistas {
    aid_quantity:string
    call_title:string
    funding_program_name:string
    modality_code:string
    category_level_code:string
    institute_name:string
    modality_name:string
    scholarship_quantity:string
    }
  
    interface  GraduatePrograms {
      graduate_program_id:string
      name:string
    }
  
    interface Departments {
      dep_des:string
      dep_email:string
      dep_nom:string
      dep_id:string
      dep_sigla:string
      dep_site:string
      dep_tel:string
      img_data:string
    }
  
    interface ResearchGroups {
      area:string
      group_id:string
      name:string
    }

export function ResearcherIndicators(props:Research) {

    type Filter = {
        year: number[]
        qualis: string[]
      }
  
      const [filters, setFilters] = useState<Filter[]>([]);
  
      // Função para lidar com a atualização de researcherData
      const handleResearcherUpdate = (newResearcherData: Filter[]) => {
        setFilters(newResearcherData);
  
  
      };
  
      const yearString = filters.length > 0 ? filters[0].year.join(';') : '';

    const {urlGeralAdm, urlGeral} = useContext(UserContext)

    const [a1, seta1] = useState('');
    const [a2, seta2] = useState('');
    const [a3, seta3] = useState('');
    const [a4, seta4] = useState('');
    const [b1, setb1] = useState('');
    const [b2, setb2] = useState('');
    const [b3, setb3] = useState('');
    const [b4, setb4] = useState('');
    const [c, setc] = useState('');
    const [sq, setsq] = useState('');
    
    const [livro, setLivro] = useState('');
    const [capLivro, setCapLivro] = useState('');
    
    const [t1, setT1] = useState('');
    const [t2, setT2] = useState('');
    const [t3, setT3] = useState('');
    const [t4, setT4] = useState('');
    const [t5, setT5] = useState('');

    const [software, setSoftware] = useState('');
    const [patenteCondecida, setPatenteConcedida] = useState('');
    const [patenteNaoConcedida, setPatenteNaoConcedida] = useState('');
    const [relTec, setRelTec] = useState('');

    const [pesosProducao, setPesosProducao] = useState<PesosProducao>({
        a1: a1,
        a2: a2,
        a3: a3,
        a4: a4,
        b1: b1,
        b2: b2,
        b3: b3,
        b4: b4,
        c: c,
        sq: sq,
        t1: t1,
        t2: t2,
        t3: t3,
        t4: t4,
        t5: t5,
        livro: livro,
        cap_livro: capLivro,
        software: software,
        patente_concedida: patenteCondecida,
        patente_nao_concedida: patenteNaoConcedida,
        rel_tec: relTec,
      })
    

    const urlGet = urlGeralAdm + `indprod/query?institution_id=083a16f0-cccf-47d2-a676-d10b8931f66b`;

    console.log(urlGet)
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlGet, {
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
        if (data.length != 0) {
          const newData = data[0] // Assumindo que data é um array e tem apenas um elemento
          seta1(newData.a1);
          seta2(newData.a2);
          seta3(newData.a3);
          seta4(newData.a4);
          setb1(newData.b1);
          setb2(newData.b2);
          setb3(newData.b3);
          setb4(newData.b4);
          setc(newData.c);
          setsq(newData.sq);
          setT1(newData.f1);
          setT2(newData.f2);
          setT3(newData.f3);
          setT4(newData.f4);
          setT5(newData.f5);
          setLivro(newData.book);
          setCapLivro(newData.book_chapter);
          setSoftware(newData.software);
          setPatenteConcedida(newData.patent_granted);
          setPatenteNaoConcedida(newData.patent_not_granted);
          setRelTec(newData.report);

          setPesosProducao(newData)

        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);


 

  console.log(pesosProducao)

   let urlDados = `${urlGeral}researcher/DadosGerais?researcher_id=${props.id}&year=${yearString}`
   
   const [loading, isLoading] = useState(false)
   const [dados, setDados] = useState<Dados[]>([]);

   useEffect(() => {
    const fetchData = async () => {
        try {
          isLoading(true)
          const response = await fetch(urlDados, {
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
            setDados(data);
            isLoading(false)
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [urlDados]);

    return(
        <div>
 <div className="mt-6 mb-16">
               
        
               <h1 className=" max-w-[500px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]  md:block mb-3 ">
              índices de produção de {props.name}
               </h1>
               <div className="flex flex-wrap flex-1 items-center gap-3 mt-2">
                                {props.area != '' && (
                  props.area.split(';').map((value, index) => (
                    <li
                      key={index}
                  className={`py-2 whitespace-nowrap px-4 rounded-md text-xs font-bold flex gap-2 text-white items-center ${value.includes('CIENCIAS AGRARIAS') ? 'bg-red-400' : value.includes('CIENCIAS EXATAS E DA TERRA') ? 'bg-green-400' : value.includes('CIENCIAS DA SAUDE') ? 'bg-[#20BDBE]' : value.includes('CIENCIAS HUMANAS') ? 'bg-[#F5831F]' : value.includes('CIENCIAS BIOLOGICAS') ? 'bg-[#EB008B]' : value.includes('ENGENHARIAS') ? 'bg-[#FCB712]' : value.includes('CIENCIAS SOCIAIS APLICADAS') ? 'bg-[#009245]' : value.includes('LINGUISTICA LETRAS E ARTES') ? 'bg-[#A67C52]' : value.includes('OUTROS') ? 'bg-[#1B1464]' : 'bg-[#000]'}
                                  `}
                    >
                      <PuzzlePiece size={12} className="text-white" /> {value.trim()}
                    </li>
                  ))
                )}
{props.graduation != '' && (
                  <div className={`bg-blue-700 py-2 px-4 text-white rounded-md text-xs font-bold flex gap-2 items-center`}><GraduationCap size={12} className="textwhite" /> {props.graduation}</div>
                )}


                                {props.city != "None" && (
                    <div className="bg-blue-700 py-2 px-4 text-white rounded-md text-xs font-bold flex gap-2 items-center"><MapPin size={12} className="textwhite" /> {props.city}</div>
                  )}


                                </div>
       
                         </div>

                         <Alert className="p-6 flex gap-3 mb-4 md:mb-8">
    <div>  <OctagonAlert size={24}/></div>
    <div>
    <AlertTitle>Atenção aos índices de produção</AlertTitle>
      <AlertDescription>
      Os gráficos são gerados a partir da quantidade de produção por ano do pesquisador e multiplicado pelo peso respectivo. Os pesos de produção são gerenciado pelo administrador da plataforma com base na documentação do Sucupira
      </AlertDescription>

      <div className="flex flex-wrap gap-4 mt-6">
      <div className="flex items-center gap-2 text-xs ">
                        <div className="h-4 w-4 bg-[#34663C] rounded-md"></div> A1 - {a1}
                    </div>

                    <div className="flex items-center gap-2 text-xs ">
                        <div className="h-4 w-4 bg-[#9DC356] rounded-md"></div> A2 - {a2}
                    </div>

                    <div className="flex items-center gap-2 text-xs ">
                        <div className="h-4 w-4 bg-[#B1C38A] rounded-md"></div>A3 - {a3}
                    </div>

                    <div className="flex items-center gap-2 text-xs ">
                        <div className="h-4 w-4 bg-[#BEC4B3] rounded-md"></div> A4 - {a4}
                    </div>

                    <div className="flex items-center gap-2 text-xs ">
                        <div className="h-4 w-4 bg-[#D56438] rounded-md"></div> B1 - {b1}
                    </div>

                    <div className="flex items-center gap-2 text-xs ">
                        <div className="h-4 w-4 bg-[#DD883D] rounded-md"></div> B2 - {b2}
                    </div>

                    
                    <div className="flex items-center gap-2 text-xs ">
                        <div className="h-4 w-4 bg-[#E3B081] rounded-md"></div> B3 - {b3}
                    </div>

                    <div className="flex items-center gap-2 text-xs ">
                        <div className="h-4 w-4 bg-[#E3AC96] rounded-md"></div> B4 - {b4}
                    </div>

                    <div className="flex items-center gap-2 text-xs ">
                        <div className="h-4 w-4 bg-[#CE3830] rounded-md"></div> C - {c}
                    </div>

                    <div className="flex items-center gap-2 text-xs ">
                        <div className="h-4 w-4 bg-[#4A1314] rounded-md"></div> Sem qualis - {sq}
                    </div>

                    <div className="flex items-center gap-2 text-xs ">
                        <div className="h-4 w-4 bg-blue-200 rounded-md"></div> T1 - {t1}
                    </div>

                    <div className="flex items-center gap-2 text-xs ">
                        <div className="h-4 w-4 bg-blue-300 rounded-md"></div> T2 - {t2}
                    </div>

                    <div className="flex items-center gap-2 text-xs ">
                        <div className="h-4 w-4 bg-blue-400 rounded-md"></div> T3 - {t3}
                    </div>

                    <div className="flex items-center gap-2 text-xs ">
                        <div className="h-4 w-4 bg-blue-500 rounded-md"></div> T4 - {t4}
                    </div>

                    <div className="flex items-center gap-2 text-xs ">
                        <div className="h-4 w-4 bg-blue-600 rounded-md"></div> T5 - {t5}
                    </div>

                    <div className="flex items-center gap-2 text-xs ">
                        <div className="h-4 w-4 bg-[#096670] rounded-md"></div> Software - {software.toUpperCase()}
                    </div>

                    <div className="flex items-center gap-2 text-xs ">
                        <div className="h-4 w-4 bg-[#662D91] rounded-md"></div> Relatório Técnico - {relTec.toUpperCase()}
                    </div>

                    <div className="flex items-center gap-2 text-xs ">
                        <div className="h-4 w-4 bg-[#6BC26B] rounded-md"></div> Patente concedida - {patenteCondecida.toUpperCase()}
                    </div>

                    <div className="flex items-center gap-2 text-xs ">
                        <div className="h-4 w-4 bg-[#CE3830] rounded-md"></div> Patente não concedida - {patenteNaoConcedida.toUpperCase()}
                    </div>


      </div>
    </div>
    </Alert>

            <FilterYearIndicators
              onFilterUpdate={handleResearcherUpdate}/>
            <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
            <Alert className=" h-[400px] lg:col-span-3 ">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                    <CardTitle className="text-sm font-medium">
                    Índice de produção de artigos
                    </CardTitle>
                    <CardDescription>Termos mais presentes nos artigos</CardDescription>
                    </div>

                    <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent>
                      <p>Fonte: Plataforma Lattes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                   
                  </CardHeader>
                  <CardContent className="mt-4">
                    <GraficoIndiceArticle articles={dados} pesosProducao={pesosProducao} />
                  </CardContent>
                    </Alert>

            <Alert className=" h-[400px] ">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                    <CardTitle className="text-sm font-medium">
                    índice de produção técnica
                    </CardTitle>
                    <CardDescription>Termos mais presentes nos artigos</CardDescription>
                    </div>

                    <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent>
                      <p>Fonte: Plataforma Lattes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                   
                  </CardHeader>
                  <CardContent>

                  </CardContent>
                    </Alert>

                    <Alert className=" h-full lg:col-span-2 ">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                    <CardTitle className="text-sm font-medium">
                    índice de livros e capítulos
                    </CardTitle>
                    <CardDescription>Termos mais presentes nos artigos</CardDescription>
                    </div>

                    <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent>
                      <p>Fonte: Plataforma Lattes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                   
                  </CardHeader>
                  <CardContent className="mt-4">
                    <GraficoIndiceBooksAndChapters articles={dados} pesosProducao={pesosProducao} />
                  </CardContent>
                    </Alert>

                   
            </div>
        </div>
    )
}