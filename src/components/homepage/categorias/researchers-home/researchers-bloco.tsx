import {  useState } from "react";
import { ResearchItem } from "./researcher-item";

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Button } from "../../../ui/button";
import { Plus } from "phosphor-react";

type Research = {
    researcher: any[];
}

export function ResearchersBloco(props: Research) {

    const [count, setCount] = useState(12)
    

    return(
       <div className="">
       <ResponsiveMasonry
    columnsCountBreakPoints={{
        350: 1,
        750: 2,
        900: 3,
        1200:  3,
        1500: 4,
        1700: 5
    }}
>

                     <Masonry gutter="16px">
             {props.researcher.slice(0, count).map((item: any) => {

                return (
                    <ResearchItem
                    among={item.among}
                    articles={item.articles}
                    book={item.book}
                    book_chapters={item.book_chapters}
                    id={item.id}
                    name={item.name}
                    university={item.university}
                    lattes_id={item.lattes_id}
                    area={item.area}
                    lattes_10_id={item.lattes_10_id}
                    city={item.city}
                    graduation={item.graduation}
                    patent={item.patent}
                    speaker={item.speaker}
                    h_index={item.h_index}
                    relevance_score={item.relevance_score}
                    works_count={item.works_count}
                    cited_by_count={item.cited_by_count}
                    i10_index={item.i10_index}
                    scopus={item.scopus}
                    openalex={item.openalex}
                    departament={item.departament}
                    subsidy={item.subsidy}
                    graduate_programs={item.graduate_programs}
                    />
                );
            })}
        </Masonry>
        </ResponsiveMasonry>

        {props.researcher.length > count && (
            <div className="w-full flex justify-center mt-8"><Button onClick={() => setCount(count + 12)}><Plus size={16} />Mostrar mais</Button></div>
        )}
       </div>
    )
}