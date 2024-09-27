import React, { FocusEvent, ReactNode, useState } from 'react';
import ReactLoading from 'react-loading';
import iconSearch from './assets/icon-search.svg'
import { rules } from './rules'
import './styles.css'

type InputSelectSearchablePropsType = {
  data: {
      id: string,
      attributes: Record<string, string>
      dataSource?: string,
      rules?: string,
      value?: string
  },
  actions?: {
    handleChangeAction?: (input: Record<string, string>) => void,
    handleClickAction?: (input: Record<string, string>) => void,
    handleBlurAction?: (input: Record<string, string>) => void,
    handleFocusInAction?: (input: Record<string, string>) => void,
    handleFocusOutAction?: (input: Record<string, string>) => void,
  },
  additionalComponents?: Array<ReactNode>
}

export default function Index({ data }: InputSelectSearchablePropsType){
  const [options, setOptions] = useState<Array<Record<string, string>>>()
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedOptionId, setSelectedOptionId] = useState('')
  const [showOptions, setShowOptions] = useState(false)

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
  function handleSelectOption({ name, id } : { name: string, id: string }){
    setSelectedOption(`${id} - ${name}`)
    setSelectedOptionId(id)
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
    const response = await fetch(`${data.dataSource}?name=${searchTerm}`);
    const options = await response.json();
   
    setOptions(options)
    setLoading(false)
  }

  const [isValidValue, setIsValidValue] = useState(true);
  const [isNotValidValueMessage, setIsNotValidValueMessage] = useState('');

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

  return (
    <div style={{position:'relative'}} className={`col-md-${data.attributes?.grid} pt-2 pb-2 form-group`} onMouseLeave={() => handleCloseOptions()}>
        
        {/* Label */} 
        <div>
        <label className="text-muted" htmlFor={data.attributes?.name || data.attributes?.id || ''}>
            &nbsp;
            { data.attributes?.label || data.attributes?.name } 
            { data.attributes?.required && (<span className="required">&nbsp;*</span>) }
          </label> 
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
                <div key={index} className="option mb-2" onClick={() => handleSelectOption({name: item.name, id: item.id})} >
                    <div><b>Cód: </b>{item.id}</div>
                    <div><b>Descrição: </b>{item.name}</div>
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
  )
}