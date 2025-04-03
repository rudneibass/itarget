
import { ReactNode, useState } from "react";

type ListTableType = {
  data: Array<{
    id: string;  
    name: string | ReactNode;
    description: string | ReactNode;
    node?: ReactNode; 
  }> | undefined,
  actions?: {
    edit?: (itemId: string) => void,
    remove?: (itemId: string) => void,
    activeDeactive?: (itemId: string) => void,
    sort?: (sortBy: string, sortDirection: string) => void
  },
  additionalComponents?: Array<ReactNode>
}

export default function ListCards({ data, actions } : ListTableType) {
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
      <div className="row">
        {data && data.length > 0 &&
          data.map((item, index) => (
          <div key={index} className="col-md-3">
            <div className="card mb-3">
              
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="card-title">{item.name}</h5>
                    <small className="card-text text-muted">{item.description}</small>
                  </div>
                </div>
              </div>
              
              <div className="card-footer text-end">  
                <span className="badge bg-danger" onClick={() => handleDelete(item.id)}>
                  <i className="bi-trash"></i>
                </span>
                &nbsp;
                <span className="badge bg-secondary" onClick={() => handleActive(item.id)}>
                  <i className="bi-check"></i>
                </span>
                &nbsp;
                <span className="badge bg-warning" onClick={() => handleEdit(item.id)}>
                  <i className="bi-pencil"></i>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
