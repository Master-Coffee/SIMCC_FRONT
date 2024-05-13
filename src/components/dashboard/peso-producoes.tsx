import { ArrowCounterClockwise, Book, CheckSquare, PlusCircle, Quotes, Stamp } from "phosphor-react";
import { Alert } from "../ui/alert";
import { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { UserContext } from "../../context/context";


export function PesoProducoes() {

  const {urlGeralAdm, user} = useContext(UserContext)

  const [a1, seta1] = useState(0);
  const [a2, seta2] = useState(0);
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
  
  const urlGet = urlGeralAdm + `indprod/query?institution_id=${user.institution_id}`;
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
          seta1(Number(newData.a1));
          seta2(Number(newData.a2));
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

          console.log(newData)
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);


    const qualis = [
      { id: 1, itens: 'A1', valueSetter: seta1 , value: a1 },
      { id: 2, itens: 'A2', valueSetter: seta2, value:a2 },
      { id: 3, itens: 'A3', valueSetter: seta3, value:a3 },
      { id: 4, itens: 'A4', valueSetter: seta4, value:a4 },
      { id: 5, itens: 'B1', valueSetter: setb1, value:b1 },
      { id: 6, itens: 'B2', valueSetter: setb2, value:b2 },
      { id: 7, itens: 'B3', valueSetter: setb3, value:b3 },
      { id: 8, itens: 'B4', valueSetter: setb4, value:b4 },
      { id: 10, itens: 'C', valueSetter: setc, value:c },
      { id: 11, itens: 'SQ', valueSetter: setsq, value:sq },
  ];

  const ts = [
    { id: 't1', itens: 'T1', valueSetter: setT1 , value: t1 },
    { id: 't2', itens: 'T2', valueSetter: setT2, value:t2 },
    { id: 't3', itens: 'T3', valueSetter: setT3, value:t3 },
    { id: 't4', itens: 'T4', valueSetter: setT4, value:t4 },
    { id: 't5', itens: 'T5', valueSetter: setT5, value:t5 },
   
];

      const qualisColor: { [key: string]: string } = {
        'A1': 'bg-[#006837]',
        'A2': 'bg-[#8FC53E]',
        'A3': 'bg-[#ACC483]',
        'A4': 'bg-[#BDC4B1]',
        'B1': 'bg-[#F15A24]',
        'B2': 'bg-[#F5831F]',
        'B3': 'bg-[#F4AD78]',
        'B4': 'bg-[#F4A992]',
        'C': 'bg-[#EC1C22]',
        'SQ': 'bg-[#560B11]',
        'NP': 'bg-[#560B11]'
      }

      const tsColor: { [key: string]: string } = {
        'T1': 'bg-blue-200',
        'T2': 'bg-blue-300',
        'T3': 'bg-blue-400',
        'T4': 'bg-blue-500',
        'T5': 'bg-blue-600',
      }

      const resetArticles = async () => {
        seta1('1')
        seta2('0.875')
        seta3('0.75')
        seta4('0.625')
        setb1('0.5')
        setb2('0.375')
        setb3('0.25')
        setb4('0.125')
        setc('0')
        setsq('0')
      }

      const resetProdCien = async () => {
        setLivro('1')
        setCapLivro('0.25')
      }

      const resetProdTec = async () => {
        setT1('2')
        setT2('1.5')
        setT3('1')
        setT4('0.5')
        setT5('0.1')

        setSoftware('t5')
        setPatenteConcedida('t4')
        setPatenteNaoConcedida('t4')
        setRelTec('t5')

      }

      const url = urlGeralAdm + 'indprod/insert'

      const data = [
        {
          institution_id:user.institution_id,
            A1: a1,
            A2: a2,
            A3: a3,
            A4: a4,
            B1: b1,
            B2: b2,
            B3: b3,
            B4: b4,
            C: c,
            SQ: sq,

            F1:t1,
            F2:t2,
            F3:t3,
            F4:t4,
            F5:t5,

            BOOK:livro,
            BOOK_CHAPTER: capLivro,

            SOFTWARE: software,
            PATENT_GRANTED: patenteCondecida,
            PATENT_NOT_GRANTED: patenteNaoConcedida,
            REPORT: relTec
          }
      ]

      const Submit = () => {

          const fetchData = async () => {
            try {
              const response = await fetch(url, {
                mode: "cors",
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
                    description: "Peso de produção atualizado",
                    action: {
                      label: "Fechar",
                      onClick: () => console.log("Undo"),
                    },
                  })
               
              } else {
                console.error('Erro ao enviar dados para o servidor.');
                toast("Tente novamente!", {
                    description: "Tente novamente",
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
      
      }

      

    return(
        <div className="flex flex-col mb-16">
          

           <div className="w-full flex mb-3">
                        <div className=" dark:border-neutral-800 border border-r-0 border-neutral-200 w-2 rounded-l-md bg-blue-700 whitespace-nowrap"></div>

                        <Alert  className="rounded-l-none ">

                        <div className="flex justify-between mb-6">
                            <div>
                            <div className="flex items-center gap-3  ">
                            <Quotes size={24} className="text-gray-400" />
                            <p className="text-sm font-bold">Índice artigos</p>
                            </div>
                            </div>

                            <div className="">
                                <Button variant={'ghost'} onClick={() => resetArticles()}  className="text-blue-700 hover:text-blue-800"><ArrowCounterClockwise size={16} />Resetar</Button>
                            </div>
                        </div>

                        <div className="gap-4 grid grid-cols-5 ">
                        {qualis.map((props) => {
    return(
        <div className="flex gap-3" key={props.id}>
            <div className={`cursor-pointer gap-3 transition-all flex items-center  rounded-md text-xs font-medium `}>
                <div className={`rounded-sm h-4 w-4 ${qualisColor[props.itens]}`}></div>
                <span className="text-center block">{props.itens}</span>
              
            </div>
            <Input
                className=""
                type="number"
                onChange={(e) => props.valueSetter(e.target.value)}
                value={Number(props.value)}
            />
        </div>
    );
})}
</div>
                        </Alert>
                        </div>
     





           <div className="w-full flex mb-3">
                        <div className=" dark:border-neutral-800 border border-r-0 border-neutral-200 w-2 rounded-l-md bg-blue-700 whitespace-nowrap"></div>

                        <Alert  className="rounded-l-none ">

                        <div className="flex justify-between mb-6">
                            <div>
                            <div className="flex items-center gap-3 ">
<Book size={24} className="text-gray-400" />
           <p className="text-sm font-bold">Índice livros e capítulos</p>
           </div>
                            </div>

                            <div className="">
                                <Button variant={'ghost'} onClick={() => resetProdCien()}  className="text-blue-700 hover:text-blue-800"><ArrowCounterClockwise size={16} />Resetar</Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
         
         <div className="flex items-center  gap-4  ">
           <Label className="whitespace-nowrap">Livro</Label>
           <Input value={livro} onChange={(e) => setLivro(e.target.value)} type="number" placeholder="Peso"/>
       </div>
      

   
         <div className="flex items-center  gap-4 ">
           <Label className="whitespace-nowrap">Capítulo de livro</Label>
           <Input value={capLivro} onChange={(e) => setCapLivro(e.target.value)} type="number" placeholder="Peso"/>
       </div>
    
      </div>
                        </Alert>
                        </div>

          

           

           <div className="w-full flex mb-6">
                        <div className=" dark:border-neutral-800 border border-r-0 border-neutral-200 w-2 rounded-l-md bg-blue-700 whitespace-nowrap"></div>

                        <Alert  className="rounded-l-none ">

                        <div className="flex justify-between mb-6">
                            <div>
                            <div className="flex items-center gap-3 ">
                            <Stamp size={24} className="text-gray-400" />
           <p className="text-sm font-bold">Índice produção técnica</p>
           </div>
                            </div>

                            <div className="">
                                <Button variant={'ghost'} onClick={() => resetProdTec()}  className="text-blue-700 hover:text-blue-800"><ArrowCounterClockwise size={16} />Resetar</Button>
                            </div>
                        </div>

                        <div className="gap-4 grid grid-cols-5 mb-4">
                        {ts.map((props) => {
    return(
        <div className="flex gap-3" key={props.id}>
            <div className={`cursor-pointer gap-3 transition-all flex items-center  rounded-md text-xs font-medium `}>
                <div className={`rounded-sm h-4 w-4 ${tsColor[props.itens]}`}></div>
                <span className="text-center block">{props.itens}</span>
              
            </div>
            <Input
                className=""
                type="number"
                onChange={(e) => props.valueSetter(e.target.value)}
                value={Number(props.value)}
            />
        </div>
    );
})}
</div>

<div className=" bg-neutral-200 dark:bg-neutral-800 h-[0.5px] w-full mb-4"></div>

                        <div className="grid grid-cols-2 gap-4">
              
              <div className="flex items-center  gap-4  ">
                <Label className="whitespace-nowrap min-w-[150px]">Patente concedida</Label>
                <Select defaultValue={patenteCondecida} value={patenteCondecida} onValueChange={(value) => setPatenteConcedida(value)}>
            <SelectTrigger className="w-full whitespace-nowrap">
                <SelectValue placeholder="Escolha o tipo" />
            </SelectTrigger>
            <SelectContent>
                {ts.map((props) => {
                  return(
                    <SelectItem value={props.id}> <div className="flex gap-4 items-center mr-2"><div className={`flex rounded-sm h-4 w-4 ${tsColor[props.itens]}`} ></div>{props.itens}</div></SelectItem>
                  )
                })}
            </SelectContent>
            </Select>
            </div>

            <div className="flex items-center  gap-4  ">
                <Label className="whitespace-nowrap min-w-[150px]">Patente não concedida</Label>
                <Select defaultValue={patenteNaoConcedida} value={patenteNaoConcedida} onValueChange={(value) => setPatenteNaoConcedida(value)}>
            <SelectTrigger className="w-full whitespace-nowrap">
                <SelectValue placeholder="Escolha o tipo" />
            </SelectTrigger>
            <SelectContent>
                {ts.map((props) => {
                  return(
                    <SelectItem value={props.id}> <div className="flex gap-4 items-center mr-2"><div className={`flex rounded-sm h-4 w-4 ${tsColor[props.itens]}`} ></div>{props.itens}</div></SelectItem>
                  )
                })}
            </SelectContent>
            </Select>
            </div>
          

         
              <div className="flex items-center  gap-4 ">
                <Label className="whitespace-nowrap min-w-[150px]">Software</Label>
                <Select defaultValue={software} value={software} onValueChange={(value) => setSoftware(value)}>
            <SelectTrigger className="w-full whitespace-nowrap">
                <SelectValue placeholder="Escolha o tipo" />
            </SelectTrigger>
            <SelectContent>
                {ts.map((props) => {
                  return(
                    <SelectItem value={props.id}> <div className="flex gap-4 items-center mr-2"><div className={`flex rounded-sm h-4 w-4 ${tsColor[props.itens]}`} ></div>{props.itens}</div></SelectItem>
                  )
                })}
            </SelectContent>
            </Select>
            </div>

            <div className="flex items-center  gap-4 ">
                <Label className="whitespace-nowrap min-w-[150px]">Relatório técnico</Label>
                <Select defaultValue={relTec} value={relTec} onValueChange={(value) => setRelTec(value)}>
            <SelectTrigger className="w-full whitespace-nowrap">
                <SelectValue placeholder="Escolha o tipo" />
            </SelectTrigger>
            <SelectContent>
                {ts.map((props) => {
                  return(
                    <SelectItem value={props.id}> <div className="flex gap-4 items-center mr-2"><div className={`flex rounded-sm h-4 w-4 ${tsColor[props.itens]}`} ></div>{props.itens}</div></SelectItem>
                  )
                })}
            </SelectContent>
            </Select>
            </div>
             
             
           </div>
                        </Alert>

                  
                        </div>

         <div className="w-full flex items-center">
         <Button variant={'ghost'} onClick={() => {
          resetProdTec()
          resetArticles()
          resetProdCien()
         }}  className="text-blue-700 hover:text-blue-800 ml-auto"><ArrowCounterClockwise size={16} />Resetar</Button>

          <Button onClick={() => Submit()}><ArrowCounterClockwise size={16} />Atualizar</Button>
         </div>
        </div>
    )
}