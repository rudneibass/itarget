import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { rules } from './rules'

type InputSelectPropsType = {
  data: {
    id: string
    attributes: Record<string, string>
    options?: Array<{ option_value: string, option_text: string }>
    rules?: string
  },
  actions?: {
    edit?: (itemId: string) => void,
    remove?: (itemId: string) => void,
    activeDeactive?: (itemId: string) => void
  }
}

export default function Index({ data, actions }: InputSelectPropsType) {
  const [value, setValue] = useState<string>(data.attributes.value || '');
  const [isValidValue, setIsValidValue] = useState(true);
  const [isNotValidValueMessage, setIsNotValidValueMessage] = useState('');

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const inputValue = event.target.value;
    setValue(inputValue);
  }

  function handleBlur(event: FocusEvent<HTMLSelectElement>) {
    const inputValue = event.target.value;
    const inputRules = event.target.dataset.rules;
    let validationMessage = '';

    if (inputRules) {
      const arrayOfRules = JSON.parse(inputRules);
      arrayOfRules.map((item: Record<string, string>) => {
        if (rules[item['rule']](inputValue)) {
          setIsValidValue(true);
        } else {
          setIsValidValue(false);
          validationMessage += `${item['message'] || 'Verifique este campo.'} | `;
        }
      });
      setIsNotValidValueMessage(validationMessage.replace(/\|([^|]*)$/, '$1'));
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

        <select
          className={`form-control ${data.attributes?.class} ${!isValidValue ? 'is-invalid' : ''}`}
          id={data.attributes?.id || data.attributes?.name || ''}
          name={data.attributes?.name || data.attributes?.id || ''}
          data-rules={data.rules || ''}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          title={data.attributes?.title || ''}
          required={data.attributes?.required ? true : false}
          disabled={data.attributes?.disabled ? true : false}
          data-toggle={data.attributes?.toggle || ''} 
          data-placement={data.attributes?.placement || ''}
        >
          <option value="">Selecione uma opção</option>
          {data.options && data.options.map(option => (
            <option key={option.option_value} value={option.option_value}>
              {option.option_text}
            </option>
          ))}
        </select>
        {!isValidValue && (
          <div className="invalid-feedback">
            {isNotValidValueMessage}
          </div>
        )}
      </div>
    </div>
  );
}
