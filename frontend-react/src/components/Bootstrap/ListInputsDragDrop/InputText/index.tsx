import { ChangeEvent, FocusEvent, useState } from 'react'
import { masks } from './masks'
import { rules } from './rules'

type InputTextPropsType = {
    data: {
        id: string,
        attributes: Record<string, string>
        rules?: string,
        value?: string
    },
    actions?: {
      edit?: (itemId: string) => void,
      remove?: (itemId: string) => void,
      activeDeactive?: (itemId: string) => void
    }
  }

export default function Index({data, actions}: InputTextPropsType) {
    const [value, setValue] = useState<string>()
    const [isValidValue, setIsValidValue]  = useState(true)
    const [isNotValidValueMessage, setIsNotValidValueMessage]  = useState('')

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      let inputValue = event.target.value
      const inputMask = event.target.dataset.mask
      
      if (inputMask && masks[inputMask]) {
        inputValue = masks[inputMask](inputValue);
      } 
    
      setValue(inputValue)
    }
    

    function handleBlur(event: FocusEvent<HTMLInputElement>){
      const inputValue = event.target.value;
      const inputRules = event.target.dataset.rules
      let isNotValidValueMessage = ''

      if(inputRules){
        const arrayOfRules = JSON.parse(inputRules)
        arrayOfRules.map((item: Record<string, string> ) => {
          if(rules[item['rule']](inputValue)){
            setIsValidValue(true)
          }
          if(!rules[item['rule']](inputValue)){
            setIsValidValue(false)
            
            isNotValidValueMessage += `${(item['message'] || 'Verifique este campo.')} | `
            setIsNotValidValueMessage(isNotValidValueMessage.replace(/\|([^|]*)$/, '$1'))
          }  
        })
      }
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
      <div >
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

          <input
            type={data.attributes?.type || 'text'}
            className={`form-control ${data.attributes?.class} ${!isValidValue ? 'is-invalid' : ''}`}
            id={data.attributes?.id || data.attributes?.name || ''}
            name={data.attributes?.name || data.attributes?.id || ''}
            placeholder={data.attributes?.placeholder || ''}
            title={data.attributes?.title || ''}
            required={data.attributes?.required ? true : false}
            readOnly={data.attributes?.readOnly ? true : false}
            disabled={data.attributes?.disabled ? true : false}
            data-mask={data.attributes?.mask}
            data-rules={data.rules || ''}
            data-toggle={data.attributes?.toggle || ''} 
            data-placement={data.attributes?.placement || ''}
            onBlur={handleBlur}
            onChange={handleChange}
            value={value}
          />
          {!isValidValue && (
            <div className="invalid-feedback">
                {isNotValidValueMessage}
            </div>
          )}
        </div>
      </div>
    )
}