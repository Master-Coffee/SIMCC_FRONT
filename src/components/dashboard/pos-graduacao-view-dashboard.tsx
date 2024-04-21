import { useContext, useEffect, useState } from "react";
import { useModal } from "../hooks/use-modal-store"
import { Alert } from "../ui/alert";
import { UserContext } from "../../context/context";
import { ArrowSquareOut, DotsThree, Eye, EyeSlash, Hash, MapPin, PencilSimple, Star, Trash } from "phosphor-react"; 
import {GraduationCapIcon } from "lucide-react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { toast } from "sonner"




  interface PosGraduationsProps {
    graduate_program_id: string
    code: string
    name: string
    area: string
    modality: string
    type: string
    rating: string
    institution_id: string
    description: string
    url_image: string
    city:string
    visible: boolean
  }

  import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
  


export function PosGraducaoView() {
  let qualisColor = {
    'MESTRADO': 'bg-[#006837]',
    'DOUTORADO': 'bg-[#8FC53E]',

}

    const { urlGeralAdm, user } = useContext(UserContext);
    const [posgraduations, setPosgraduations] = useState<PosGraduationsProps[]>([]);
    const [visibleProgram, setVisibleProgram] = useState(false);
    const { onOpen } = useModal();

    const urlGetPosGraduations = urlGeralAdm + `GraduateProgramRest/Query?institution_id=${user.institution_id}`
  
  

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(urlGetPosGraduations, {
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
                setPosgraduations(data);
            }
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, [urlGetPosGraduations,visibleProgram]);

      const handleVisibleProgram = (id: string) => {

        const urlVisibleProgram = urlGeralAdm  + `GraduateProgramRest/Update?graduate_program_id=${id}`
        const fetchData = async () => {
         
          try {
            const response = await fetch(urlVisibleProgram, {
              mode: 'cors',
              method: 'POST',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '3600',
                'Content-Type': 'text/plain'
              }
            });
            if (response.ok) {

              setVisibleProgram(!visibleProgram)
              toast("Dados visibilidade com sucesso!", {
                description: "Operação realizada com sucesso!",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              })
            } 
      
          
          } catch (err) {
            toast("Erro ao mudar visibilidade", {
              description: "Revise os dados e tente novamente",
              action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
              },
            })
          } 
        };
        fetchData();
     
    
      };

    return(
      <ResponsiveMasonry
      columnsCountBreakPoints={{
          350: 1,
          750: 2,
          900: 2,
          1200: 3
      }}
  >
                   <Masonry gutter="16px">


                    
       {posgraduations.map((posgraduation) => (
        
          <div className="flex items-center">
                 <div
                  
                      className={`h-full w-2 rounded-l-md dark:border-neutral-800 border border-neutral-200 border-r-0 ${posgraduation.modality.includes('ACADÊMICO') ? 'bg-blue-300' : posgraduation.modality.includes('PROFISSIONAL') ? 'bg-blue-900' : 'bg-[#000]'} `}
                    >
                      
                    </div>

            <Alert className="flex gap-4 rounded-l-none">
            <div className="flex flex-col">
            <img className="w-12 h-auto object-cover object-center rounded-l-lg" src={posgraduation.url_image} alt={posgraduation.name} />
           
          </div>
          <div className="flex flex-col justify-between w-full">
            <div className="flex flex-col justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Hash size={12}/>{posgraduation.code}</div>
              <h2 className=" font-medium">{posgraduation.name}</h2>
             
            </div>
            <div className="flex items-center justify-between mt-4 gap-4">
                        <div className="flex items-center gap-4">
                        
                        <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><GraduationCapIcon size={12}/>{posgraduation.type}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><MapPin size={12}/>{posgraduation.city}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Star size={12}/>{posgraduation.rating}</div>

                        </div>

                        <div className="flex gap-3">
                        <Button variant="outline" size={'icon'} className="ml-auto text-sm text-gray-500 dark:text-gray-300" onClick={() =>handleVisibleProgram(posgraduation.graduate_program_id)}>
            {posgraduation.visible ? (<EyeSlash size={16}/>):(<Eye size={16}/>)}
            </Button>
                        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={'icon'} className="ml-auto text-sm text-gray-500 dark:text-gray-300">
            <DotsThree size={16}/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-auto">
          <Link to={`/pos-graducao/${posgraduation.code}`}><DropdownMenuItem className="flex items-center gap-3"><ArrowSquareOut className="h-4 w-4" />Visualizar página</DropdownMenuItem></Link>
          <DropdownMenuItem className="flex items-center gap-3"  ><PencilSimple className="h-4 w-4" />Editar informações</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white"><Trash className="h-4 w-4" />
          <Button variant ="null" onClick={() => onOpen('confirm-delete-pos-graduate-program', {id_delete:posgraduation.graduate_program_id})}> Deletar programa</Button>
         </DropdownMenuItem>
       

          </DropdownMenuContent>
        </DropdownMenu>
                        </div>
                        
                    </div>
          
          </div>
            </Alert>
          </div>
        

      ))}

     
      </Masonry>
      </ResponsiveMasonry>
       
    
    
   
        
    )
}