import axios from 'axios';

type PaginatedListLinksType = {
  url: string | null;
  label: string;
  active: boolean;
}

type PaginationBarType = {
  data: { paginationLinks: Array<PaginatedListLinksType> | undefined },
  actions?: { paginate: ({ data, paginationLinks }: { data:[], paginationLinks: Array<PaginatedListLinksType> }) => void }
}

export default function index({data, actions} : PaginationBarType) {

  async function handlePaginate(url: string) {
    if(actions?.paginate){
      if (url){
        try {
          const response = await axios.get(url);
          actions.paginate({data: response.data.data, paginationLinks: response.data.links});
        } catch (error) {
          console.error(error);
          throw new Error(`Erro ao tentar obter dados de ${url}`);
        }
      }
    }
  }

  return (
    <section className="mt-3">
      <div className="d-flex justify-content-between align-items-end">
        <small className='pb-3'>Registros por página: 10</small>
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {data.paginationLinks &&
              data.paginationLinks.length > 0 &&
              data.paginationLinks.map((item, index) => (
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
