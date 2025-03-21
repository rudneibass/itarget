import { ChangeEvent, useState } from 'react'

type InputCheckboxPropsType = {
  data: {
    id: string
    attributes: Record<string, string>,
    value?: boolean
  },
  actions?: {
    edit?: (itemId: string) => void,
    remove?: (itemId: string) => void,
    activeDeactive?: (itemId: string) => void
  }
}

export default function Index({ data, actions }: InputCheckboxPropsType) {
  const [checked, setChecked] = useState<boolean>(data.attributes.checked ? true : false)
  
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked
    setChecked(isChecked)
  }

  function handleEdit(itemId: string) {
    if(actions?.edit){
      actions.edit(itemId);
    }
  }

  function handleRemove(itemId: string) {
    if(actions?.remove){
      actions.remove(itemId);
    }
  }

  function handleActiveDeactive(itemId: string){
    if(actions?.activeDeactive){
      actions.activeDeactive(itemId)
    }
  }
  

  return (
    <div>
      <div 
        className="form-group mb-5"
        style={{ 
          outline: '2px dashed #d8d8d8', 
          outlineOffset: '5px'
        }}
      >
        <div className='d-flex justify-content-between align-items-center w-100'>
          <label className='text-muted' htmlFor={data.attributes?.name || data.attributes?.id || ''}>
            <small>
              &nbsp;{data.attributes?.label || data.attributes?.name || ''}
            </small>
          </label>
          <div className='d-flex justify-content-between align-items-center w-100'>
          <label className='text-muted' htmlFor={data.attributes?.name || data.attributes?.id || ''}>
            <small>
              &nbsp;{data.attributes?.label || data.attributes?.name || ''}
            </small>
          </label>

          <div style={{paddingBottom: '7px'}}>
            {actions?.remove && (
              <>
                <span 
                  className="badge text-bg-danger" 
                  style={{ borderRadius: "0px"}}
                  onClick={() => handleRemove(data.id)}
                >
                  <i className='bi-trash'/>
                </span>              
              </>
            )}
            {actions?.activeDeactive && (
              <>
                &nbsp;
                <span 
                  className="badge text-bg-secondary" 
                  style={{ borderRadius: "0px"}}
                  onClick={() => handleActiveDeactive(data.id)}
                >
                <i className='bi-check'/>
                </span>
              </>
            )}
            {actions?.edit && (
              <>
                &nbsp;
                <span 
                  className="badge text-bg-warning" 
                  style={{ borderRadius: "0px"}}
                  onClick={() => handleEdit(data.id)}
                >
                  <i className="bi-pencil"></i>
                </span>
              </>
            )}
          </div>
        </div>
        </div>
        <div className="form-check" style={{marginTop: "14px"}}>
          <input
            type="checkbox"
            className={`form-check-input ${data.attributes?.class || ''}`}
            id={data.attributes?.id}
            name={data.attributes?.name}
            required={data.attributes?.required ? true : false}
            readOnly={data.attributes?.readOnly ? true : false}
            disabled={data.attributes?.disabled ? true : false}
            checked={checked}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}
