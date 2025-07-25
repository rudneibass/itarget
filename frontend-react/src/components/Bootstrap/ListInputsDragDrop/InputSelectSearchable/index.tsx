import React, { FocusEvent, useState } from 'react';
import ReactLoading from 'react-loading';
import iconSearch from './assets/icon-search.svg'
import { rules } from './rules'
import './styles.css'

type InputSelectSearchablePropsType = {
  data: {
    id: string
    attributes: Record<string, string>
    rules?: string
    value?: string
  },
  actions?: {
    edit?: (itemId: string) => void,
    remove?: (itemId: string) => void,
    activeDeactive?: (itemId: string) => void
  }
}

export default function Index({ data, actions }: InputSelectSearchablePropsType){
  const [options, setOptions] = useState<Array<Record<string, string>>>()
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedOptionId, setSelectedOptionId] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [isValidValue, setIsValidValue] = useState(true)
  const [isNotValidValueMessage, setIsNotValidValueMessage] = useState('')

  function handleOpenOptions(){
    if(!showOptions){
      setShowOptions(true)
      handleSearch('')
    } 
  }
  function handleCloseOptions(){
    if(showOptions){
      setShowOptions(false)
      setSearchTerm('')
    }
  }
  function handleSelectOption({ displayName, value } : { displayName: string, value: string }){
    setSelectedOption(`${value} - ${displayName}`)
    setSelectedOptionId(value)
    handleCloseOptions()
    setIsValidValue(true);
  }
  function handleClearSelection(){
    setSelectedOption('')
    setSelectedOptionId('')
  }
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
    if(!showOptions){
      setShowOptions(true)
    } 
  }
  async function handleSearch(searchTerm: string){
    setLoading(true)
    const response = await fetch(`${data.attributes.data_source}?name=${searchTerm}`)
    const options = await response.json()

    setOptions(options)
    setLoading(false)
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
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
    <div style={{position:'relative'}} onMouseLeave={() => handleCloseOptions()}>
      <div  
        className="form-group mb-5"
        style={{ 
          outline: '2px dashed #d8d8d8', 
          outlineOffset: '5px'
        }}
      >

        {/* Label */} 
        <div className='d-flex justify-content-between align-items-center w-100'>
          <label className="text-muted" htmlFor={data.attributes?.name || data.attributes?.id || ''}>
            &nbsp;
            <small>
              { data.attributes?.label || data.attributes?.name } 
              { data.attributes?.required && (<span className="required">&nbsp;*</span>) }
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

        <div style={{position: "relative"}}>
          {/* Input de pesquisa */}    
          {!selectedOption && (
            <input
              id={data.attributes?.id}
              name={data.attributes?.name} 
              className={`form-control ${!isValidValue ? 'is-invalid' : ''}`}
              type="text"
              onClick={handleOpenOptions}
              onFocus={handleOpenOptions}
              onChange={handleInputChange}
              onBlur={handleBlur}
              value={searchTerm || selectedOptionId}
              placeholder={data.attributes?.placeholder || 'Digite um termo para pesquisa.'}
              title={data.attributes?.title || ''}
              required={data.attributes?.required ? true : false}
              readOnly={data.attributes?.readOnly ? true : false}
              disabled={data.attributes?.disabled ? true : false}
              data-rules={data.rules || ''}
              data-toggle={data.attributes?.toggle || ''} 
              data-placement={data.attributes?.placement || ''}
            />
          )}

          {/* Opção selecionada  */}
          {selectedOption && (  
            <div className="form-control selected-option">
              {selectedOption && (
                <>
                  <span> { selectedOption } </span>
                  <button type="button" className="clear-button" onClick={handleClearSelection}> &#10006;</button>
                </>
              )}  
            </div>
          )}

          {/* Opções  */}
          {showOptions && (
            <div className="options pt-2 pl-2 pr-2 pb-0" >
              {!options && !loading && (
                <div className="option border mb-2">
                  {data.attributes?.placeholder}
                </div>
              )}
              {!options && loading && (
                <div className="pl-3 mb-2">
                   <ReactLoading  type={'bubbles'} color={'rgba(128, 128, 128, 0.596)'}  width={'30px'} height={'30px'}/>
                </div>
              )}
              {options && options.length === 0 && !loading && (
                <div className="option mb-2">
                  Pesquisa não obteve resultados.
                </div>
              )}
              {options && options.length > 0 && options.map((item, index) => (
                <div key={index} className="option mb-2" onClick={() => handleSelectOption({ displayName: item.display_name, value: item.id})} >
                    <div><b>Cód: </b>{ item.id }</div>
                    <div><b>Descrição: </b>{ item.display_name }</div>
                </div>
              ))}
            </div>
          )}

          {/* Icone da lupa  */}
          {isValidValue && (
            <img src={iconSearch} alt="" style={{position: 'absolute', top: '50%', right: '10px',transform: 'translateY(-50%)'}} />
          )}

          {!isValidValue && (
            <div className="invalid-feedback">
              { isNotValidValueMessage }
            </div>
          )}
        </div>
      </div>    
    </div>
  )
}