import { useContext, useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { UserContext } from "../../../context/context";
import { DisplayCargo } from "./display-cargo";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { BriefcaseBusiness, ChevronDown, ChevronsUpDown, ChevronUp, Octagon, OctagonAlert, Plus, Trash, UserCheck, UserCog } from "lucide-react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { MagnifyingGlass, User, Users } from "phosphor-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { EditarInfoUsuarios } from "./editar-info-usuarios";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";


interface Disciplinas {
   role:string
   id:string
}

interface PesquisadorProps2 {
  display_name: string
  email: string
  user_id:string
  roles:Roles[]
  photo_url:string
}

interface Roles {
  role:string
  role_id:string
}


export function CargosFuncoes() {
    const [data, setData] = useState<Disciplinas[]>([]);
    const [dataSelecionado, setDataSelecionado] = useState<Disciplinas | null>(null);

    const { urlGeralAdm, urlGeral, user} = useContext(UserContext)
    let urlDisciplinas = urlGeralAdm + `s/role`;

        const fetchDataGet = async () => {
            try {
                const response = await fetch(urlDisciplinas, {
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
                    setData(data);
                }
            } catch (err) {
                console.log(err);
            }
        };


   useEffect(() => {
        fetchDataGet();
    }, [urlDisciplinas]);

    console.log(data)

    //

    const [nomePesquisador, setNomePesquisador] = useState('');


    const handleSubmitPesquisador = async () => {
        try {

          if(nomePesquisador.length === 0) {
            toast("Preencha o nome do cargo", {
              description: "Tente novamente!",
              action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
              },
            })

            return
          }

            const data = [
                {
                    role:nomePesquisador
                  }
              ]

               let urlProgram = urlGeralAdm + 's/role'

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
                        description: "Cargo adicionado a coleção, adicione as funcionalidades",
                        action: {
                          label: "Fechar",
                          onClick: () => console.log("Undo"),
                        },
                      })
                  
                        setNomePesquisador('')
                        fetchDataGet()
                   
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

    const [isOn, setIsOn] = useState(true);

    const [tab, setTab] = useState('cargos')

    ////LISTA USUARIOS

    const [input, setInput] = useState('')
    //listar todos os pesquisadores popover
    const [pesquisadoreSelecionado, setPesquisadorSelecionado] = useState<PesquisadorProps2 | undefined>();
    const [researcherSearch, setResearcherSearch] = useState<PesquisadorProps2[]>([]);
  

    const [openPopUpIndex, setOpenPopUpIndex] = useState<number | null>(null);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);


    //todos os usuarios
    let urlGetStudent = urlGeralAdm + `/s/user/all`;

    const fetchDataStudent = async () => {
      try {
        const response = await fetch(urlGetStudent, {
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
          
          setResearcherSearch(data);

        }
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      fetchDataStudent()
    }, []);

    const normalizeString = (str:any) => {
      return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
    };
    

    const filteredList = researcherSearch.filter((framework) =>
      normalizeString(framework.display_name).includes(normalizeString(input))
    );



    //adicionar usuario a cargo

    const handleSubmitUsuario = async (id_role: string) => {
      try {
        if (pesquisadoreSelecionado?.display_name.length === 0) {
          toast("Selecione um usuário", {
            description: "Tente novamente!",
            action: {
              label: "Fechar",
              onClick: () => console.log("Undo"),
            },
          });
          return;
        }
    
        const data = [
          {
            role_id: id_role,
            user_id: pesquisadoreSelecionado?.user_id,
            institution_id:user?.institution_id || ''
          },
        ];
    
        const urlProgram = urlGeralAdm + '/s/user/role';
        console.log(urlProgram);
    
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
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
    
            if (response.ok) {
              toast("Dados enviados com sucesso", {
                description: "Usuário vinculado ao cargo",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              });

              fetchDataStudent()
              setPesquisadorSelecionado(undefined);
            } else if (response.status === 409) {
              toast("Tente novamente!", {
                description: "Usuário já vinculado a esse cargo",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              });
            } else {
              toast("Tente novamente!", {
                description: "Erro ao vincular usuário ao cargo",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              });
            }
          } catch (err) {
            console.log(err);
          }
        };
    
        fetchData();
      } catch (error) {
        console.error('Erro ao processar a requisição:', error);
      }
    };
    
    //adicionar usuario a cargo

    const handleDeleteUsuario = async (id_role: string, user_id:string) => {
      try {
        if (pesquisadoreSelecionado?.display_name.length === 0) {
          toast("Selecione um usuário", {
            description: "Tente novamente!",
            action: {
              label: "Fechar",
              onClick: () => console.log("Undo"),
            },
          });
          return;
        }
    
        const data = [
          {
            role_id: id_role,
            user_id: user_id,
          },
        ];
    
        const urlProgram = urlGeralAdm + '/s/user/role';
        console.log(urlProgram);
    
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
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
    
            if (response.ok) {
              toast("Dados enviados com sucesso", {
                description: "Usuário vinculado ao cargo",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              });

              fetchDataStudent()
              setPesquisadorSelecionado(undefined);
            } else if (response.status === 409) {
              toast("Tente novamente!", {
                description: "Usuário já vinculado a esse cargo",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              });
            } else {
              toast("Tente novamente!", {
                description: "Erro ao vincular usuário ao cargo",
                action: {
                  label: "Fechar",
                  onClick: () => console.log("Undo"),
                },
              });
            }
          } catch (err) {
            console.log(err);
          }
        };
    
        fetchData();
      } catch (error) {
        console.error('Erro ao processar a requisição:', error);
      }
    };
    


    return(
        <Tabs defaultValue={tab} value={tab}>
              <div className={`w-full ${isOn ? 'px-8' : 'px-4'} border-b border-b-neutral-200 dark:border-b-neutral-800`}>
              {isOn && (
                  <div className="w-full pt-4 mb-2 flex justify-between items-center">
                 <CardTitle>Configurações de acesso</CardTitle>
                  </div>
                )}
                <div className={`flex pt-2 justify-between  ${isOn ? '' : ''} `}>
                  <div className="flex items-center gap-2">
                  <div className={`pb-2 border-b-2 transition-all ${tab == 'cargos' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`}>
                    <Button variant={tab == 'cargos' ? ('ghost'):('ghost')}  onClick={() => setTab('cargos')}>
                       <BriefcaseBusiness className="h-4 w-4" />
                       Cargos
                     </Button>
                    </div>

                    <div className={`pb-2 border-b-2 transition-all ${tab == 'usuarios' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`}>
                    <Button variant={tab == 'usuarios' ? ('ghost'):('ghost')}  onClick={() => setTab('usuarios')}>
                       <Users className="h-4 w-4" />
                       Vincular usuário à cargo
                     </Button>
                    </div>

                    <div className={`pb-2 border-b-2 transition-all ${tab == 'pesquisadores' ? ('border-b-[#719CB8]'):(' border-b-transparent ')}`}>
                    <Button variant={tab == 'pesquisadores' ? ('ghost'):('ghost')}  onClick={() => setTab('pesquisadores')}>
                       <UserCog className="h-4 w-4" />
                       Editar informações do usuário
                     </Button>
                    </div>
                  </div>

                  <div>
                   
                    <Button variant="ghost"  size="icon" onClick={() => setIsOn(!isOn)}>
                      {isOn ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

             <TabsContent value="cargos">
             <main className="grid flex-1 items-start gap-4 p-4 md:p-8 md:gap-8 lg:grid-cols-3 xl:grid-cols-3  pb-4 md:pb-8">
              <div className={`grid auto-rows-max items-start gap-4 md:gap-8 ${dataSelecionado ? ('lg:col-span-2') : ('lg:col-span-3')}`}>
              <Alert
                className="p-0" x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>Adicionar cargo</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Adicione o cargo, este poderá ser atrelado a um docente ou técnico, possuindo acesso a funcionalidades da plataforma.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                <div className="flex w-full gap-6 items-end">
                <div className="flex flex-col space-y-1.5 w-full flex-1">
           <Label htmlFor="name">Nome do cargo</Label>
           <Input value={nomePesquisador} onChange={(e) => setNomePesquisador(e.target.value)} type="text"  />
           </div>
                 <Button onClick={() => handleSubmitPesquisador()}><Plus size={16}/>Adicionar cargo</Button>
                 </div>
                </CardFooter>
              </Alert>

              <ResponsiveMasonry
                    columnsCountBreakPoints={{
                        350: 1,
                        720: 2,
                        900: 2,
                        1200: dataSelecionado ? 3 : 4,
                    }}
                >
                    <Masonry gutter="16px">

                        {data.map((props) => (
                            <div className="flex cursor-pointer ">
            
                            <div className={`w-2 min-w-[8px]  flex flex-1 h-full bg-[#719CB8] rounded-l-lg border border-r-0 border-neutral-200 dark:border-neutral-800 ` }></div>
                             <Alert onClick={() => setDataSelecionado(props)} className="rounded-l-none">
                                  <div className="flex items-center gap-3">
                               
                                  <p className="font-medium text-sm ">{props.role}</p>
                                  </div>
                            </Alert>
                           </div>
                        ))}
                        </Masonry>
                    </ResponsiveMasonry>
              </div>

              {dataSelecionado && (
                <DisplayCargo
                    role={dataSelecionado.role}
                    id={dataSelecionado.id} 
                />
            )}
        </main>
             </TabsContent>

             <TabsContent value="usuarios">
             <main className=" p-4 md:p-8 md:gap-8  gap-4">
            <div className="flex flex-col gap-4 md:gap-8">
            <Alert className="p-6 flex gap-3">
    <div>  <OctagonAlert size={24}/></div>
    <div>
    <AlertTitle>Cuidados na vinculação</AlertTitle>
      <AlertDescription>
      O cargo só pode ser atribuído ao usuário após ele ter realizado algum login na plataforma.
      </AlertDescription>
    </div>
    </Alert>

    {data.map((props, index) => {
       const isExpanded = expandedIndex === index

        // Filtra os pesquisadores que têm o mesmo role que o item atual de data
  const filteredResearchers = researcherSearch.filter(
    (researcher) => researcher.roles.some((role) => role.role === props.role)
  );

  return (
    <div className="">
      <Alert className="p-0 ">
        <CardHeader className="flex flex-row items-start bg-neutral-100 dark:bg-neutral-800">
          <div className="flex items-center justify-between w-full">
            <CardTitle className="group flex items-center w-fit gap-2 text-lg">
              <div className="w-fit">{props.role}</div>
            </CardTitle>
            <div className="flex gap-3 items-center ">
              <Button onClick={() => setExpandedIndex(isExpanded ? null : index)}><User size={16} />Adicionar membro</Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 text-sm flex flex-col gap-6">
        
        {isExpanded && (
          <div className="gap-6 flex  items-end">
            <div className="grid gap-3 w-full">
              <Label htmlFor="name">Usuário</Label>

              <Dialog open={openPopUpIndex === index} onOpenChange={() => setOpenPopUpIndex(openPopUpIndex === index ? null : index)}>
                <DialogTrigger className="w-full">
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPopUpIndex === index}
                    className="w-full justify-between"
                  >
                    {pesquisadoreSelecionado
                      ? researcherSearch.find((framework) => framework.display_name === pesquisadoreSelecionado.display_name)?.display_name
                      : 'Selecione um usuário'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="z-[9999]">
                  <DialogHeader>
                    <DialogTitle>Escolher pesquisador</DialogTitle>
                    <DialogDescription>
                      Todos os docentes cadastrados no Módulo Administrativo da instituição
                    </DialogDescription>
                  </DialogHeader>

                  <div className="border rounded-md px-6 h-12 flex items-center gap-1 border-neutral-200 dark:border-neutral-800">
                    <MagnifyingGlass size={16} />
                    <Input
                      className="border-0"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Buscar pesquisador"
                    />
                  </div>

                  <div className={'max-h-[350px] overflow-y-auto elementBarra'}>
                    <div className="flex flex-col gap-1 p-2">
                    {filteredList.length > 0 ? (
                                  filteredList.map((props, index) => (
                                    <Button
                                      variant={'ghost'}
                                      key={index}
                                      className="text-left justify-start h-auto"
                                      onClick={() => {
                                        setPesquisadorSelecionado(props);
                                  
                                        setOpenPopUpIndex(null);
                                      }}
                                    >
                                    <Avatar className="cursor-pointer rounded-md  h-8 w-8">
      <AvatarImage  className={'rounded-md  h-8 w-8'} src={`${props.photo_url}`} />
      <AvatarFallback className="flex items-center justify-center"><User size={12}/></AvatarFallback>
  </Avatar> <div>
    <p>{props.display_name} </p>
  <div className="text-xs text-gray-500 font-normal">({props.email})</div>
  </div>
                                    </Button>
                                  ))
                                ) : (
                            <div className="text-center w-full text-sm">Nenhum pesquisador encontrado</div>
                                )}
                    </div>
                  </div>
                  
                </DialogContent>
              </Dialog>
            </div>

            <Button  onClick={() => handleSubmitUsuario(props.id)}><Plus size={16}/>Adicionar</Button>
          </div>
        )}

<div className="grid gap-3 w-full">
        <Label htmlFor="name">Membros cadastrados</Label>
        </div>

        <div className="flex-col flex gap-3">
        {filteredResearchers.map((researcher) => (
              <div key={researcher.user_id} className="group flex items-center justify-between h-10">
               <div className="flex items-center gap-2">
               <Avatar className="cursor-pointer rounded-md  h-8 w-8">
      <AvatarImage  className={'rounded-md  h-8 w-8'} src={`${researcher.photo_url}`} />
      <AvatarFallback className="flex items-center justify-center"><User size={12}/></AvatarFallback>
  </Avatar> <div>
    <p className="font-medium">{researcher.display_name} </p>
  <div className="text-xs text-gray-500">({researcher.email})</div>
  </div>
               </div>

                <Button onClick={() => handleDeleteUsuario (props.id, researcher.user_id)} variant={'destructive'} size={'icon'} className="w-8 h-8 group-hover:flex hidden"><Trash className="h-3.5 w-3.5"/></Button>
              </div>
            ))}
        </div>
        </CardContent>
      </Alert>
    </div>
  );
})}
            </div>
             </main>
             </TabsContent>

             <TabsContent value="pesquisadores">
             <main className=" p-4 md:p-8 md:gap-8  gap-4">
                <EditarInfoUsuarios/>
             </main>
             </TabsContent>
        </Tabs>
    )
}