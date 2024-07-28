import {  useContext, useEffect, useState } from "react"

import { ScrollArea } from "../../ui/scroll-area"
import { cn } from "../../../lib"
import { UserContext } from "../../../context/context"

import {Building, GraduationCapIcon, Hash, Mail, MapPinIcon, Plus,  Users } from "lucide-react"


interface Departamentos {
  dep_id:string
  org_cod: string
  dep_nom: string
  dep_des: string
  dep_email: string
  dep_site: string
  dep_tel: string
  img_data:string
  dep_sigla: string
}

  interface Props {
    onResearcherUpdate: (newResearcher: Departamentos) => void;
    url:string
    search:string
  }

import { Button } from "../../ui/button"
import { Skeleton } from "../../ui/skeleton"
import { useModal } from "../../hooks/use-modal-store"

export function ItensListDepartamento(props:Props) {
    const [total, setTotal] = useState<Departamentos[]>([]);
    const [selectedResearcher, setSelectedResearcher] = useState<Departamentos | null>(null);
    // Atualize essa função para chamar a propriedade `onResearcherUpdate`
    const updateResearcher = (newResearcher: Departamentos) => {
        if (props.onResearcherUpdate) {
          props.onResearcherUpdate(newResearcher);
          setSelectedResearcher(newResearcher);
        }
      };
      const [isLoading, setIsLoading] = useState(false)


    const urlPatrimonioInsert = props.url;

   
 
      const fetchData = async () => {
       
        try {
            
          const response = await fetch(urlPatrimonioInsert , {
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
              setTotal(data)
              setIsLoading(false)
          }
        } catch (err) {
          console.log(err);
        }
      };


      useEffect(() => {
      fetchData()
     
    }, [urlPatrimonioInsert]);

    const qualisColor = {
      'MESTRADO': 'bg-blue-200',
      'DOUTORADO': 'bg-blue-800',
    };
    

      console.log(total)
      const [count, setCount] = useState(12)

      const search = props.search

      const filteredTotal = Array.isArray(total) ? total.filter(item => {
        // Normaliza a string do item e da busca para comparação
        const normalizeString = (str:any) => str
          .normalize("NFD") // Decompõe os caracteres acentuados
          .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos
          .toLowerCase(); // Converte para minúsculas
      
        const searchString = normalizeString(item.dep_nom);
        const normalizedSearch = normalizeString(search);
      
        return searchString.includes(normalizedSearch);
      }) : [];

      const {type, isOpen} = useModal()

      useEffect(() => {
        if (type === 'confirm-delete-departamento' && !isOpen) {
          fetchData();
        } else if (type === 'add-departamento' && !isOpen) {
          fetchData();
        }
    
        fetchData();
      }, [isOpen, type]);
  
      

  return (
    <ScrollArea className="h-[calc(100vh-180px)]">
      {isLoading ? (
        <div className="flex flex-col gap-2 p-4 pt-0">
        <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
        <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
        <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
        <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
        <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>

        <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
        <Skeleton className="w-full h-[120px] rounded-md"></Skeleton>
        </div>
      ):(
        <div className="flex flex-col gap-2 p-4 pt-0">
        {filteredTotal.slice(0, count).map((item) => {
          
          return(
<div className="flex" onClick={() => updateResearcher(item)}>
<div className={`w-2 min-w-2 rounded-l-md dark:border-neutral-800 bg-center  bg-no-repeat backdrop-blur-xl  border min-h-[120px]  border-neutral-200 border-r-0   relative `} style={{
              backgroundImage: `url(data:image/jpeg;base64,${item.img_data})`,
           
            }}></div>
  
            <button
       
            className={cn(
              `flex flex-col rounded-lg w-full rounded-l-none ${item.dep_id === selectedResearcher?.dep_id ? 'bg-neutral-100 dark:bg-neutral-700': 'bg-white dark:bg-neutral-800' } dark:border-neutral-700 items-start gap-2  border p-3 text-left text-sm transition-all hover:bg-accent`,
            
            )}
           
          >

<div className="flex justify-between items-center w-full">
           <div className="text-xs font-medium mb-2 flex items-center gap-2">{item.dep_id}
          </div>
           <Building size={16}/>
           </div>
           
        <div className="flex justify-between w-full items-center">
        <div className="flex w-full flex-col">
           <div className="flex w-full flex-col gap-1">
          
              <div className="flex items-center">

            
                
                <div className="flex items-center gap-2">
                    
                  <div className="font-semibold text-lg">{item.dep_sigla} - {item.dep_nom}</div>
                  
                 
                </div>
                <div
                  
                >
                  
                </div>

              </div>
              
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground flex gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Hash size={12}/>{item.org_cod}</div>
            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Mail size={12}/>{item.dep_email}</div>
          
            </div>

            

           </div>
           <img className="h-12" src={`data:image/jpeg;base64,${item.img_data}`} alt={item.dep_nom} />
            
        </div>
           
          </button>

          
          </div>
          )
            })}

    {filteredTotal.length > count && (
            <Button variant={'outline'} onClick={() => setCount(count + 12)}><Plus size={16} />Mostrar mais</Button>
        )}
      </div>
      )}
    </ScrollArea>
  )
}

