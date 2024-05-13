import { Hash, MapPin, Star } from "phosphor-react";
import { Alert } from "../ui/alert";
import { GraduationCapIcon } from "lucide-react";

interface GraduateProgram {
    area: string;
    code: string;
    graduate_program_id: string;
    modality: string;
    name: string;
    rating: string;
    type: string;
    city: string
    state: string
    instituicao: string
    url_image: string
    region: string
    sigla: string
    visible:boolean
  }

export function ProgramItem(props:GraduateProgram) {
    return(
        <div className="flex items-center">
                 <div
                  
                      className={`h-full w-2 rounded-l-md dark:border-neutral-800 border border-neutral-200 border-r-0 ${props.modality.includes('ACADÊMICO') ? 'bg-blue-300' : props.modality.includes('PROFISSIONAL') ? 'bg-blue-900' : 'bg-[#000]'} `}
                    >
                      
                    </div>

            <Alert className="flex gap-4 rounded-l-none">
            <div className="flex flex-col">
            <img className="w-12 h-auto object-cover object-center rounded-l-lg" src={props.url_image} alt={props.name} />
           
          </div>
          <div className="flex flex-col justify-between w-full">
            <div className="flex flex-col justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Hash size={12}/>{props.code}</div>
              <h2 className=" font-medium">{props.name}</h2>
             
            </div>
            <div className="flex items-center justify-between mt-4 gap-4">
                        <div className="flex items-center gap-4">
                        
                        <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><GraduationCapIcon size={12}/>{props.type}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><MapPin size={12}/>{props.city}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300 font-normal flex gap-1 items-center"><Star size={12}/>{props.rating}</div>

                        </div>

                        <div className="flex gap-3">
                      
                   
                        </div>
                        
                    </div>
          
          </div>
            </Alert>
          </div>
    )
}