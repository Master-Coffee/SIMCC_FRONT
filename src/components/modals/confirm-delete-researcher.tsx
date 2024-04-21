
import { DialogFooter, DialogHeader, Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { useModal } from "../hooks/use-modal-store";
import { Button } from "../ui/button";
import { Trash } from "phosphor-react";
import { toast } from "sonner"
import { UserContext } from "../../context/context";
import { useContext} from "react";



export function ConfirmDeleteResearcher() {
    const { onClose, isOpen, type: typeModal, data } = useModal();
    const isModalOpen = isOpen && typeModal === "confirm-delete-researcher";

    const id_delete = String(data.id_delete)
    const {urlGeralAdm} = useContext(UserContext)

    const handleDeleteResearcher= (id: string) => {

  
    
    
      const urlDeleteProgram =  urlGeralAdm + `ResearcherRest/Delete?researcher_id=${id}`
      
    
      const fetchData = async () => {
       
        try {
          const response = await fetch(urlDeleteProgram, {
            mode: 'cors',
            method: 'DELETE',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'DELETE',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Max-Age': '3600',
              'Content-Type': 'text/plain'
            }
          });
          if (response.ok) {
            toast("Dados deletados com sucesso!", {
              description: "Pesquisador removido da base de dados",
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
      
      fetchData()
    
    }

    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}> 
        <DialogContent>
        <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-2xl text-center font-medium">
         Deletar pesquisador 
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
          Tem certeza de que deseja excluir o pesquisador vinculado a esta instituição?
          </DialogDescription>
            </DialogHeader>

            <DialogFooter className=" py-4 ">
              <Button variant={'destructive'}   onClick={() => handleDeleteResearcher(id_delete)}>
              <Trash size={16} className="" />Deletar
              </Button>
            </DialogFooter>

            </DialogContent>
            </Dialog>
    )
}