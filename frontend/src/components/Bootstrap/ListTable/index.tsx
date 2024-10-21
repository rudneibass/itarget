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
    handleEditAction?: (itemId: string) => void,
    handleDeleteAction?: (itemId: string) => void,
    handleActiveAction?: (itemId: string) => void,
    handleSortAction?: (sortBy: string, sortDirection: string) => void
  },
  additionalComponents?: Array<ReactNode>
}

export default function ListTable({ data, actions } : ListTableType) {
  const [sortBy, setSortBy] = useState('')
  const [sortDirection, setSortDirection] = useState('ASC')

  function handleActive(itemId: string) {
      if(actions?.handleActiveAction){
        actions.handleActiveAction(itemId);
      }
  }

  function handleEdit(itemId: string) {
    if(actions?.handleEditAction){
      actions.handleEditAction(itemId);
    }
  }

  function handleDelete(itemId: string) {
    if(actions?.handleDeleteAction){
      actions.handleDeleteAction(itemId);
    } 
  }

  function handleSort(sortBy: string) {    
    if(actions?.handleSortAction){
      const newSortDirection = sortDirection == 'ASC' ? 'DESC' : 'ASC'
      actions.handleSortAction(sortBy, newSortDirection);
      
      setSortDirection(newSortDirection)
      setSortBy(sortBy)
    }
  }

  return (
    <section>
      <div className="table-responsive" style={{height: '40vh', overflowY: "auto" }}>
        <table className="table table-striped table-hover table-bordered">
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
                  <th style={{textAlign: 'center', width: '15%'}}>Ações</th>
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
                    <td style={{ textAlign: 'center', maxWidth: '6vw', verticalAlign: 'middle'}}>
                      {actions.handleDeleteAction && (
                        <>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm mr-2"
                            onClick={() => handleDelete(item.id.value)}
                          >
                            <i className="bi bi-trash" />
                          </button>&emsp;
                        </>
                      )}
                      {actions.handleActiveAction && (
                        <>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm mr-2"
                            onClick={() => handleActive(item.id.value)}
                          >
                            <i className="bi bi-check" />
                          </button>
                          &emsp;
                        </>
                      )}
                      {actions.handleEditAction && (
                        <>
                          <button
                            type="button"
                            className="btn btn-warning btn-sm"
                            onClick={() => handleEdit(item.id.value)}
                          >
                            <i className="bi bi-pencil" />
                          </button>
                        </>
                      )}
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
