import { useModal } from "../hooks/use-modal-store";

  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "../../components/ui/drawer"
import { Button } from "../ui/button";
import { useMemo, useState } from "react";

import { InformationResearcher } from "../popup/information-researcher";
import { useContext } from "react";
import { UserContext } from "../../context/context";


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
  }

  import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { File, Files, Quotes, Stamp, Student, Ticket } from "phosphor-react";
import { NuvemPalavras } from "../popup/nuvem-palavras";
import { ScrollArea } from "../ui/scroll-area";
import { TotalViewResearcher } from "../popup/total-view-researcher";

  


export function ResearcherModal() {
   
    const { onClose, isOpen, type: typeModal, data } = useModal();
    const isModalOpen = isOpen && typeModal === "researcher-modal";
    const [researcher, setResearcher] = useState<Research[]>([]); 
    const [loading, isLoading] = useState(false)
    const {name} = data
    const { urlGeral } = useContext(UserContext);
    console.log("Context:", useContext(UserContext));


    const urlTermPesquisadores = urlGeral + `researcherName?name=${name != null && (name.split(' ').join(';'))}`;


console.log('urlTermPesquisadores', urlTermPesquisadores)

    useMemo(() => {
        const fetchData = async () => {
            try {
              isLoading(true)
              const response = await fetch(urlTermPesquisadores, {
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
                setResearcher(data);
                isLoading(false)
              }
            } catch (err) {
              console.log(err);
            }
          };
          fetchData();
        }, [urlTermPesquisadores]);

        const [value, setValue] = useState('articles')

    return(
        <>
        <Drawer open={isModalOpen} onClose={onClose}  >
        <DrawerContent onInteractOutside={onClose}  className="px-16 pt-8">
        <DrawerHeader className="p-0">
            {researcher.slice(0, 1).map((user) => {
                return(
                   <div>
                     <InformationResearcher
                    among={user.among}
                    articles={user.articles}
                    book={user.book}
                    book_chapters={user.book_chapters}
                    id={user.id}
                    name={user.name}
                    university={user.university}
                    lattes_id={user.lattes_id}
                    area={user.area}
                    abstract={user.abstract}
                    lattes_10_id={user.lattes_10_id}
                    city={user.city}
                    orcid={user.orcid}
                    image={user.image}
                    graduation={user.graduation}
                    patent={user.patent}
                    software={user.software}
                    brand={user.brand}
                    lattes_update={user.lattes_update}
                    
                    />

                   </div>
                )
            })}

<div className="flex gap-6">
<div className="w-full flex-1">
        <Tabs defaultValue="articles" value={value} className="">
  <TabsList>
    <TabsTrigger value="articles" onClick={() => setValue('articles')} className="flex gap-2 items-center"> <Quotes size={16} className="" />Artigos</TabsTrigger>
    <TabsTrigger value="book" onClick={() => setValue('book')} className="flex gap-2 items-center"><File size={16} className="" />Livros e capítulos</TabsTrigger>
    <TabsTrigger value="producao-tecnica" onClick={() => setValue('producao-tecnica')} className="flex gap-2 items-center"><Stamp size={16} className="" />Produção técnica</TabsTrigger>
    <TabsTrigger value="relatorio-tecnico" onClick={() => setValue('relatorio-tecnico')} className="flex gap-2 items-center"><Files size={16} className="" />Relatório técnico</TabsTrigger>
    <TabsTrigger value="orientacoes" onClick={() => setValue('orientacoes')} className="flex gap-2 items-center"><Student size={16} className="" />Orientações</TabsTrigger>
    <TabsTrigger value="participacao-eventos" onClick={() => setValue('participacao-eventos')} className="flex gap-2 items-center"><Ticket size={16} className="" />Participação em eventos</TabsTrigger>
  </TabsList>
  <TabsContent value="articles">Make changes to your account here.</TabsContent>
  <TabsContent value="book">Change your password here.</TabsContent>
</Tabs>
        </div>

        <div className="w-[350px] gap-12 flex flex-col sticky"> 

        {researcher.slice(0, 1).map((user) => {
                      return(
                        <TotalViewResearcher
                        among={user.among}
                        articles={user.articles}
                        book={user.book}
                        book_chapters={user.book_chapters}
                        patent={user.patent}
                        software={user.software}
                        brand={user.brand}
                        />
                      )
            })}

      {researcher.slice(0, 1).map((user) => {
                      return(
                        <NuvemPalavras
                        id={user.id}
                        />
                      )
            })}


        </div>
</div>
        </DrawerHeader>

       


        <DrawerFooter>
          
        </DrawerFooter>
        
        </DrawerContent>
        </Drawer>
        </>
    )
}