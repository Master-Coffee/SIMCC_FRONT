import {  Copy,  Hash,  PenLineIcon, Plus, Trash } from "lucide-react";
import { Button } from "../../ui/button";
import {  CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";

import { toast } from "sonner"
import funcionalidadesData from './data.json';
import { Alert } from "../../ui/alert";
import { useContext,  useEffect,  useState } from "react";
import { UserContext } from "../../../context/context";

import {  MagnifyingGlass } from "phosphor-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Input } from "../../ui/input";

interface Disciplinas {
    role:string
    id:string
  }


  interface Permission {
    permission:string
    id:string
  }
  



export function DisplayCargo(props:Disciplinas) {

    const {urlGeralAdm} = useContext(UserContext)
   
    const handleSubmitPesquisador = async () => {
      try {

          const data = [
              {
                  id:props.id
                }
            ]

             let urlProgram = urlGeralAdm + 's/role'

             console.log(urlProgram)
             const fetchData = async () => {
       
              try {
                const response = await fetch(urlProgram, {
                  mode: 'cors',
                  method: 'DELETE',
                  headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Max-Age': '3600',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data),
                });
    
                if (response.ok) {
                 
                  toast("Dados enviados com sucesso", {
                      description: "Cargo deletado da coleção",
                      action: {
                        label: "Fechar",
                        onClick: () => console.log("Undo"),
                      },
                    })
                
                 
                } else {
                 
                  toast("Tente novamente!", {
                      description: "Erro ao cadastrar cargo na plataforma",
                      action: {
                        label: "Fechar",
                        onClick: () => console.log("Undo"),
                      },
                    })
                }
                
              } catch (err) {
                console.log(err);
              } 
            };
            fetchData();
            

  } catch (error) {
      console.error('Erro ao processar a requisição:', error);
    }

  }

  const handleSubmitFuncionalidade = async (permission:string) => {
    try {

        const data = [
            {
              role_id:props.id,
              permission:permission
              }
          ]

           let urlProgram = urlGeralAdm + 's/permission'

           console.log(urlProgram)
           const fetchData = async () => {
     
            try {
              const response = await fetch(urlProgram, {
                mode: 'cors',
                method: 'POST',
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'POST',
                  'Access-Control-Allow-Headers': 'Content-Type',
                  'Access-Control-Max-Age': '3600',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
              });
  
              if (response.ok) {
               
                toast("Dados enviados com sucesso", {
                    description: `Funcionalidade adicionado à ${props.role} `,
                    action: {
                      label: "Fechar",
                      onClick: () => console.log("Undo"),
                    },
                  })
                  fetchDataPerm();
               
              } else {
               
                toast("Tente novamente!", {
                    description: `Erro ao cadastrar funcionalidade à ${props.role} `,
                    action: {
                      label: "Fechar",
                      onClick: () => console.log("Undo"),
                    },
                  })
              }
              
            } catch (err) {
              console.log(err);
            } 
          };
          fetchData();
         
          

} catch (error) {
    console.error('Erro ao processar a requisição:', error);
  }

}



///delete
const handleDeleteFuncionalidade = async (permission:string) => {
  try {

      const data = [
          {
            id:permission,
            }
        ]

         let urlProgram = urlGeralAdm + 's/permission'

         console.log(urlProgram)
         const fetchData = async () => {
   
          try {
            const response = await fetch(urlProgram, {
              mode: 'cors',
              method: 'DELETE',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '3600',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data),
            });

            if (response.ok) {
             
              toast("Dados enviados com sucesso", {
                  description:`Funcionalidade desvinculada à ${props.role}`,
                  action: {
                    label: "Fechar",
                    onClick: () => console.log("Undo"),
                  },
                })
            
             
            } else {
             
              toast("Tente novamente!", {
                  description: `Erro ao desvincular funcionalidade à ${props.role} `,
                  action: {
                    label: "Fechar",
                    onClick: () => console.log("Undo"),
                  },
                })
            }
            
          } catch (err) {
            console.log(err);
          } 
        };
        fetchData();
        fetchDataPerm();
        

} catch (error) {
  console.error('Erro ao processar a requisição:', error);
}

}

  ///
  const [input, setInput] = useState('')

  const [openPopo2, setOpenPopo2] = useState(false)

    const normalizeString = (str:any) => {
      return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
    };

    

const funcionalidades = funcionalidadesData;
    
    const filteredList = funcionalidades.filter((framework) =>
      normalizeString(framework.name).includes(normalizeString(input))
    );


    let urlPermission = urlGeralAdm + `s/permission?role_id=${props.id}`
    const [isLoading, setIsLoading] = useState(false)

  const [total, setTotal] = useState<Permission[]>([]);

  const fetchDataPerm = async () => {
       
    try {
      setIsLoading(true)
      const response = await fetch(urlPermission , {
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

  fetchDataPerm()

}, [urlPermission]);
  
 
    return(
        <div className=" sticky top-8">
              <div
                  className={`h-3 w-full rounded-t-md dark:border-neutral-800 border border-neutral-200 border-b-0 bg-[#719CB8] `}
                ></div>
        <Alert
          className="p-0 rounded-t-none"  x-chunk="dashboard-05-chunk-4"
        >
          <CardHeader className="flex flex-row items-start bg-neutral-100 dark:bg-neutral-800">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center w-fit gap-2 text-lg">
                <div className="w-fit">{props.role}</div>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription className="flex gap-2 items-center"><Hash size={12}/>{props.id}</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-2">
             
            <Button size="icon" onClick={() => handleSubmitPesquisador()}  variant='destructive' className="h-8 w-8">
                    <Trash className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <PenLineIcon className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
            </div>
            
          </CardHeader>
          
          <CardContent className="p-6 text-sm">
      
           
            <div className="grid gap-3">
              <div className="font-semibold">Funcionalidades</div>
              <ul className="grid gap-3">

              {Array.isArray(total) && total.length > 0 && total.map((props) => (
                <div key={props.id} className="group w-full flex justify-between gap-3 h-8 ">
                  <p className="capitalize">{props.permission.split('_').join(' ')}</p>
                  <Button onClick={() => handleDeleteFuncionalidade (props.id)} variant={'destructive'} size={'icon'} className="w-8 h-8 group-hover:flex hidden"><Trash className="h-3.5 w-3.5"/></Button>
                </div>
              ))}
                
              <Dialog open={openPopo2}  onOpenChange={setOpenPopo2}>
                        <DialogTrigger className="w-full">
                        <Button variant={'ghost'} className="w-full"><Plus size={16}/>Adicionar funcionalidade</Button>
                        </DialogTrigger>
                        <DialogContent className="z-[9999]" >
    <DialogHeader>
      <DialogTitle>Escolher funcionalidade</DialogTitle>
      <DialogDescription>
       Todas as funcionalidades cadastradas no Módulo Administrativo da instituição
      </DialogDescription>
    </DialogHeader>

    <div className="border rounded-md px-6 h-12 flex items-center gap-1 border-neutral-200 dark:border-neutral-800">
                                <MagnifyingGlass size={16} />
                                <Input
                                  className="border-0"
                                  value={input}
                                  onChange={(e) => setInput(e.target.value)}
                                  placeholder="Buscar fucnionalidade"
                                />
                              </div>

                              <div className={'max-h-[350px] overflow-y-auto elementBarra'}>
                              
                              <div className="flex flex-col gap-1 p-2">
                                {filteredList.length > 0 ? (
                                  filteredList.map((props, index) => (
                                    <Button
                                      variant={'ghost'}
                                      key={index}
                                      className="text-left justify-start"
                                      onClick={() => {
                                       
                                        handleSubmitFuncionalidade(props.value)
                                   
                                        setOpenPopo2(false);
                                        // Fechar o popover após a seleção
                                      }}
                                    >
                                      {props.name}
                                    </Button>
                                  ))
                                ) : (
                            <div className="text-center w-full text-sm">Nenhuma funcionalidade encontrada</div>
                                )}
                              </div>
                            </div>
  </DialogContent>

                        </Dialog>
              </ul>
            
            </div>
         

            
            
            
           
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Cargo | Conectee
            </div>

            
          
          </CardFooter>
        </Alert>
      </div>
    )
}