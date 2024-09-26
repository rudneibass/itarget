import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import iconSearch from '~/assets/img/icon-search.svg'
import SetupGridClass from '~/components/BootstrapMade/SetupGridClass'
import { getDataParams } from '~/services/api'
import { apiFields } from './apiFields'
import { StyledComponents } from './styles';

export default function CustomSelect({ onChange, className, name, placeholder, label, field, cols, messageErros, required, apiFieldsItemObject, apiUrlPath, onSelect }){
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedOptionId, setSelectedOptionId] = useState(null)
  
  const [loadInitialOption, setLoadInitialOption] = useState(false)
  const [autoFocusInputSearch, setAutoFocusInputSearch] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  

  function handleInputChange(event){
    const newSearchTerm = event.target.value;

    setSearchTerm(newSearchTerm);
    handleSearch(newSearchTerm);

    if(!showOptions){
      setShowOptions(true)
    } 
  }

  function handleInputFocus(){
    handleSearch('')
    if(!showOptions){
      setShowOptions(true)
    } 
  }

  function handleInputBlur(){
    /*if(showOptions){
      setShowOptions(false)
    }*/
  }

  function handleOptionClick(displayName, id){
    setSelectedOption(displayName);
    setSelectedOptionId(id);
    setShowOptions(false);
 
    if(onChange){
      onChange(id)
    }
  }

  function handleOptionsLeave(){
    setShowOptions(false)
  }

  function handleClearSelection(){
    setSelectedOption(null);
    setSelectedOptionId(null)
    setAutoFocusInputSearch(true)
    handleSearch('')
    /*if (onSelect) {
      onSelect(null);
    }*/
  }

  async function handleSearch(searchTerm) {
    setLoading(true);

    const apiUrlPathArray = apiUrlPath.split('/')
    const path = apiUrlPathArray[0] ? apiUrlPathArray[0]: apiUrlPath
    const action = apiUrlPathArray[1] ? apiUrlPathArray[1] : 'list-options'
    
    const response = await getDataParams(path, action, {
      params: { 
        descricao: searchTerm,
      },
    });

    const filteredResponseData = response.data.map((item, index) => ({
      id: item[apiFields[apiFieldsItemObject].id],
      displayName: item[apiFields[apiFieldsItemObject].displayName] 
    }))
   
    setData(filteredResponseData);
    setLoading(false);
  }

  async function setInitialOption(){
    if(field && field.value){
    
      const apiUrlPathArray = apiUrlPath.split('/')
      const path = apiUrlPathArray[0] ? apiUrlPathArray[0]: apiUrlPath
      const action = apiUrlPathArray[1] ? apiUrlPathArray[1] : 'list-options'

      const response = await getDataParams(path, action);
  
      const filteredResponseData = response.data.map((item, index) => ({
        id: item[apiFields[apiFieldsItemObject].id],
        displayName: item[apiFields[apiFieldsItemObject].displayName] 
      }))

      const initialOption = filteredResponseData.find(item => item.id === field.value)
      
      if(initialOption !== undefined){
        setSelectedOption(initialOption.displayName);
        setSelectedOptionId(initialOption.id);
        setLoadInitialOption(true)
      }
    }
    return
  }
  
  if(!loadInitialOption){
    setInitialOption()
  }
  
  return (
    
    <div style={{position:'relative'}} className={`pt-2 pb-2  ${cols ? SetupGridClass(cols): ''} ${className ? className : ''}`}>
      <StyledComponents> 
        
        {/* Label */} 
        <div>
          <label>{label}</label>
          {required && (
            <span className="required">&nbsp;*</span>
          )}
        </div>

        <div className='custom-select' >

           {/* Input de pesquisa */}    
          {!selectedOption && (
            <input
              className='custom-select-input-search'
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={handleInputChange}
              onClick={handleInputFocus}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoFocus = {autoFocusInputSearch}
              style={{border:'none', borderColor: 'transparent', borderWidth: 'thin', outline: 'none'}}
            />
          )}

          {/* Opção selecionada  */}
          {selectedOption && (  
            <div className="selected-option">
              {selectedOption && (
                <>
                  <span>
                    {selectedOption}
                  </span>
                  <button type="button" onClick={handleClearSelection} className="clear-button">
                    &#10006;
                  </button>
                </>
              )}  
            </div>
          )}

          {/* Opções  */}
          {showOptions && (
            <div className="options pt-2 pl-2 pr-2 pb-0" onMouseLeave={handleOptionsLeave}>
              {!data && !loading && (
                <div className="option border mb-2">
                  {placeholder}
                </div>
              )}
              {!data && loading && (
                <div className="pl-3 mb-2">
                   <ReactLoading  type={'bubbles'} color={'rgba(128, 128, 128, 0.596)'}  width={'30px'} height={'30px'}/>
                </div>
              )}
              {data && data.length === 0 && !loading && (
                <div className="option mb-2">
                  Pesquisa não obteve resultados.
                </div>
              )}
              {data && data.length > 0 && data.map((item, index) => (
                <div key={index} className="option mb-2" onClick={() => handleOptionClick(item.displayName, item.id)} >
                    <div><b>Cód: </b>{item.id}</div>
                    <div><b>Descrição: </b>{item.displayName}</div>
                </div>
              ))}
            </div>
          )}

          {/* Icone da lupa  */}
          <img src={iconSearch} className="select-icon" alt="" />

        </div>

        {/* Input associado para armazenar o valor selecionado */}
        <input type="hidden" name={name} value={selectedOptionId || ''} />  

        {/* Mensagens de validação do campo */}      
        <span className='red'>{messageErros}</span>

      </StyledComponents>
    </div>
  )
}