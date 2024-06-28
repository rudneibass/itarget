import { LaravelPaginationLinksType } from "@services/backendApi/baseApi/types";
import { ReactNode } from "react";

type PaginationBarType = {
  data: LaravelPaginationLinksType[] | undefined,
  actions?: {
    handlePaginateAction: (url: string) => void;
  },
  additionalComponents?: Array<ReactNode>
}


export default function index({data, actions} : PaginationBarType) {

  function handlePaginate(url: string) {
    if(actions?.handlePaginateAction){
      if (!url) return;
      actions.handlePaginateAction(url);
    }
  }

  return (
    <section className="mt-3">
      <div className="d-flex justify-content-between p-1">
        <small>Registros por página: 10</small>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {data &&
              data.map((item, index) => (
                <li key={index} className="page-item">
                  <a
                    className="page-link"
                    onClick={() => handlePaginate(item.url || "")}
                    dangerouslySetInnerHTML={{ __html: item.label }}
                    style={{ whiteSpace: "nowrap", color: "gray" }}
                  ></a>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
