
import { ReactNode, useState } from "react";

type ListTableType = {
  data: Array<{
    id: string;  
    name: string;
    description: string;
    node?: ReactNode;
  }> | undefined,
  actions?: {
    handleEditAction?: (itemId: string) => void,
    handleDeleteAction?: (itemId: string) => void,
    handleActiveAction?: (itemId: string) => void,
    handleSortAction?: (sortBy: string, sortDirection: string) => void
  },
  additionalComponents?: Array<ReactNode>
}

export default function ListCards({ data, actions } : ListTableType) {
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
      <div className="row">
        {data && data.length > 0 &&
          data.map((item, index) => (
          <div key={index} className="col-md-3">
            <div className="card mb-3">
              
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                  </div>
                </div>
              </div>

              <div className="card-footer d-flex justify-content-end">
                <button className="btn btn-sm  btn-danger" onClick={() => handleDelete(item.id)}>
                  <i className="bi-trash"></i>
                </button>
                &nbsp;
                <button className="btn btn-sm btn-secondary" onClick={() => handleActive(item.id)}>
                  <i className="bi-eye"></i>
                </button>
                &nbsp;
                <button className="btn btn-sm btn-warning" onClick={() => handleEdit(item.id)}>
                  <i className="bi-pencil"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
