import { ReactNode, useState } from "react";


type ListTableType = {
  data:{ 
    thead?: Array<{ name: string; displayName: string, style?: Record<string, string>}>;
    tbody: Array<{
      [key: string]: {
        value: string ;
        node: ReactNode;
        render: boolean;
      };
    }> | undefined,
  },
  actions?: {
    edit?: (itemId: string) => void,
    remove?: (itemId: string) => void,
    sort?: (sortBy: string, sortDirection: string) => void,
    activeDeactive?: (itemId: string) => void,
  },
  additionalComponents?: Array<ReactNode>
}

export default function ListTable({ data, actions } : ListTableType) {
  const [sortBy, setSortBy] = useState('')
  const [sortDirection, setSortDirection] = useState('ASC')

  function handleActive(itemId: string) {
      if(actions?.activeDeactive){
        actions.activeDeactive(itemId);
      }
  }

  function handleEdit(itemId: string) {
    if(actions?.edit){
      actions.edit(itemId);
    }
  }

  function handleDelete(itemId: string) {
    if(actions?.remove){
      actions.remove(itemId);
    } 
  }

  function handleSort(sortBy: string) {    
    if(actions?.sort){
      const newSortDirection = sortDirection == 'ASC' ? 'DESC' : 'ASC'
      actions.sort(sortBy, newSortDirection);
      
      setSortDirection(newSortDirection)
      setSortBy(sortBy)
    }
  }

  return (
    <section>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          {data.thead && (
            <thead>
              <tr>
                {data.thead.map((item, index) => (
                  <th key={index}
                    onClick={() => handleSort(item.name)}
                    style={{ ...item.style, cursor: 'pointer' }}
                  >
                    <span>{item.displayName}</span>
                    <i
                      className="bi bi-arrow-down-short"
                      style={{color: sortDirection == 'DESC' && sortBy === item.name ? '#888888': '#ccc', marginLeft: '4px'}}
                    ></i>  
                    <i
                      className="bi bi-arrow-up-short"
                      style={{color: sortDirection == 'ASC' && sortBy === item.name ? '#888888': '#ccc', marginLeft: '-4px'}}
                    ></i>
                  </th>
                ))}  
                {actions && (
                  <th style={{textAlign: 'center', width: '13%'}}>Ações</th>
                )}
              </tr>
            </thead>
          )}
          
          <tbody>
            {data.tbody && data.tbody.length > 0 &&
              data.tbody.map((item, index) => (
              <tr key={index}>
                
                {Object.keys(item).map((key, index) => (
                  item[key].render && ( 
                    <td key={index}>{item[key].node || item[key].value}</td>
                  )
                ))}

                {actions && (
                  <td style={{ textAlign: 'center', verticalAlign: 'middle'}}>
                     <div style={{ width: '100%', display: 'flex', justifyContent:'center', gap: '.5rem'}}> 
                        {actions.edit && (
                          <button
                            type="button"
                            className="btn btn-warning btn-sm"
                            data-bs-toggle="tooltip" 
                            title="Editar registro"
                            onClick={() => handleEdit(item.id.value)}
                          >
                            <i className="bi bi-pencil" />
                          </button>
                        )}
                        {actions.activeDeactive && (
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm mr-2"
                            data-bs-toggle="tooltip" 
                            title="Ativar/desativar registro"
                            onClick={() => handleActive(item.id.value)}
                          >
                            <i className="bi bi-check" />
                          </button>
                        )}
                        {actions.remove && (
                          <button
                            type="button"
                            className="btn btn-danger btn-sm mr-2"
                            data-bs-toggle="tooltip" 
                            title="Excluir registro"
                            onClick={() => handleDelete(item.id.value)}
                          >
                            <i className="bi bi-trash" />
                          </button>
                        )}
                      </div> 
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
