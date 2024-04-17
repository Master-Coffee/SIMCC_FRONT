import { Alert } from "../../../ui/alert";
import { columns } from "./columns";

import { DataTable } from "../../categorias/researchers-home/data-table";

type Articles = {
  articles: any[];
};

export function TableReseracherArticleshome(props: Articles) {
  return (
    <div className="w-full overflow-auto ">
      <div className="rounded-md">
        <div className=" overflow-y-auto max-h-fit h-full ">
          <DataTable columns={columns} data={props.articles} />
        </div>
      </div>
    </div>
  );
}