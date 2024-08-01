import { ReactNode, useState } from "react";

type ListTableType = {
  data:{ 
    tbody: Array<Record<string, string>> | undefined,
    thead?: Array<{ name: string; displayName: string }>;
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
      <div className="table-responsive" style={{maxHeight: '45vh', minHeight: '45vh', "overflowY": "auto" }}>
        <table className="table table-striped table-hover table-bordered">
          {data.thead && (
            <thead>
              <tr>
                {data.thead.map((item, index) => (
                  <th key={index}
                    onClick={() => handleSort(item.name)}
                    style={{cursor: 'pointer'}}
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
                  <th style={{textAlign: 'center'}}>Ações</th>
                )}
              </tr>
            </thead>
          )}
          
          <tbody>
            {data.tbody && data.tbody.length > 0 &&
              data.tbody.map((item, index) => (
              <tr key={index}>
                {Object.keys(item).map((objectKeys, index) => (
                  <td key={index}>{item[objectKeys]}</td>
                ))}
                {actions && (
                    <td style={{textAlign: 'center', maxWidth: '6vw'}}>
                      {actions.handleDeleteAction && (
                        <>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm mr-2"
                            onClick={() => handleDelete(item.id)}
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
                            onClick={() => handleActive(item.id)}
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
                            onClick={() => handleEdit(item.id)}
                          >
                            <i className="bi bi-pencil" />
                          </button>&emsp;
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
