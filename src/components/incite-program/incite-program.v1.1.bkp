
import { useEffect } from 'react';

// HERE *I3*

export function InciteProgram() {

  const urlLocal = "http://127.0.0.1:8080/"
  const urlInciteProgram = `${urlLocal}graduate_program_profnit?id=`;


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
          console.log("data :" , data) // [LOG] data 
        }
      } catch (err) {
        console.log("err : ",  err);
      }
    };

  
    fetchData();


  }, [urlInciteProgram]);


  return (
    <div>incite-program 🦀 </div>
  )
}



