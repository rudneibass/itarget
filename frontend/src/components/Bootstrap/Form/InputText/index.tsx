import { ChangeEvent, FocusEvent, useEffect, useState } from 'react'
import { masks } from './masks'
import { rules } from './rules'

type InputTextPropsType = {
    data: {
        attributes: Record<string, string>
        rules?: string,
        value?: string
    },
    actions?: {
      handleChangeAction?: (input: Record<string, string>) => void,
      handleClickAction?: (input: Record<string, string>) => void,
      handleBlurAction?: (input: Record<string, string>) => void,
      handleFocusInAction?: (input: Record<string, string>) => void,
      handleFocusOutAction?: (input: Record<string, string>) => void,
    }
  }

export default function Index({data, actions}: InputTextPropsType) {
    const [value, setValue] = useState<string>()
    const [isValidValue, setIsValidValue]  = useState(true)
    const [isNotValidValueMessage, setIsNotValidValueMessage]  = useState('')

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      let inputValue = event.target.value
      const inputName = event.target.name
      const inputMask = event.target.dataset.mask
      const inputRules = event.target.dataset.rules
      
      if (inputMask && masks[inputMask]) {
        inputValue = masks[inputMask](inputValue);
      } 

      setValue(inputValue)

      if(actions?.handleChangeAction){ 
        
        if(!inputRules){
          actions?.handleChangeAction({name: inputName, value: inputValue })
        }

        if(inputRules){
          const arrayOfRules = JSON.parse(inputRules)
          let countOfSatisfiedRules = 0
          arrayOfRules.map((item: Record<string, string> ) => {
            if(rules[item['rule']](inputValue)){
              countOfSatisfiedRules++
            }  
          })
          if(countOfSatisfiedRules === arrayOfRules.length){
            actions?.handleChangeAction({name: inputName, value: inputValue})
          }
        }
        
      }
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

    useEffect(() => {
      if(data.attributes.value){
        setValue(data.attributes.value)
      }
    }, [])
    return (
      <div className={`col-md-${data.attributes?.grid}`}>
        <div className="form-group mb-3">
          <label className='text-muted' htmlFor={data.attributes?.name || data.attributes?.id || ''}>
            &nbsp;{data.attributes?.label || data.attributes?.name || ''}
          </label>
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
            onChange={handleChange}
            onBlur={handleBlur}
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