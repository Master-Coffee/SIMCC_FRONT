import {  useState } from "react";

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Button } from "../ui/button";
import { Plus } from "phosphor-react";

import { ArticleItem } from "../homepage/categorias/articles-home/article-item";

type Articles = {
    articles: any[];
    distinct: boolean
}

export function ArticleBlockPopUp(props:Articles) {
   
    const [count, setCount] = useState(12)

 

    return(
       <div>
         <ResponsiveMasonry
    columnsCountBreakPoints={{
        350: 1,
        750: 1,
        900: 2,
        1200: 3,
        1700:4
    }}
>
                 <Masonry gutter="16px">
{props.articles.slice(0, count).map((props: any) => {

        return (
            <ArticleItem
            id={props.id}
                    doi={props.doi}
                    name_periodical={props.name_periodical}
                    qualis={props.qualis}
                    title={props.title.toUpperCase()}
                    year={props.year}
                    color={props.color}
                    researcher={props.researcher}
                    lattes_id={props.lattes_id}
                    magazine={props.magazine}
                    lattes_10_id={props.lattes_10_id}
                    jcr_link={props.jcr_link}
                    jif={props.jif}
                    researcher_id={props.researcher_id}
                    distinct={props.distinct}
                    abstract={props.abstract}
                    article_institution={props.article_institution}
                    authors={props.authors}
                    authors_institution={props.authors_institution}
                    citations_count={props.citations_count}
                    issn={props.issn}
                    keywords={props.keywords}
                    landing_page_url={props.landing_page_url}
                    language={props.language}
                    pdf={props.pdf}
            />
        );
        })}
        </Masonry>
        </ResponsiveMasonry>

        {props.articles.length > count && (
            <div className="w-full flex justify-center mt-8"><Button onClick={() => setCount(count + 12)}><Plus size={16} />Mostrar mais</Button></div>
        )}

       </div>
    )
}