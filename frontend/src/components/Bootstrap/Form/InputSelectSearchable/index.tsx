import React, { ReactNode, useState } from 'react';
import ReactLoading from 'react-loading';
import iconSearch from './assets/icon-search.svg'
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
  const [options, setOptions] = useState<Array<Record<string, string>>>([
    { id: '1', displayName: 'Opção 1' },
    { id: '2', displayName: 'Opção com descrição muito grande para ver se cabe no input.' },
    { id: '3', displayName: 'Opção 3' },
    { id: '4', displayName: 'Opção 4' },
    { id: '5', displayName: 'Opção 5' },
  ])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedOptionId, setSelectedOptionId] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [ dataSource ] = useState(data.dataSource)
  
  function handleOpenOptions(){
    if(!showOptions){
      setShowOptions(true)
    } 
  }
  function handleCloseOptions(){
    if(showOptions){
      setShowOptions(false)
      setSearchTerm('')
    }
  }
  function handleSelectOption({ displayName, id } : { displayName: string, id: string }){
    setSelectedOption(`${id} - ${displayName}`)
    setSelectedOptionId(id)
    handleCloseOptions()
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
    const response = await fetch(`${dataSource}?name=${searchTerm}`);
    const options = await response.json();
    setOptions(options)
    setLoading(false)
  }

  return (
    <div style={{position:'relative'}} className={`${data.attributes?.grid} pt-2 pb-2 form-group`} onMouseLeave={() => handleCloseOptions()}>
        
        {/* Label */} 
        <div>
        <label className="text-muted" htmlFor={data.attributes?.name || data.attributes?.id || ''}>
            &nbsp;
            { data.attributes?.label || data.attributes?.name } 
            { data.attributes?.required && (<span className="required">&nbsp;*</span>) }
          </label> 
        </div>

        <div className='form-control p-0' style={{position: "relative"}}>

           {/* Input de pesquisa */}    
          {!selectedOption && (
            <input
              className='form-control'
              type="text"
              placeholder={data.attributes?.placeholder || 'Digite um termo para pesquisa.'}
              onClick={handleOpenOptions}
              onFocus={handleOpenOptions}
              onChange={handleInputChange}
              value={searchTerm}
              style={{border:'none', borderColor: 'transparent', borderWidth: 'thin', outline: 'none'}}
            />
          )}

          {/* Opção selecionada  */}
          {selectedOption && (  
            <div className="selected-option">
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
                <div key={index} className="option mb-2" onClick={() => handleSelectOption({displayName: item.displayName, id: item.id})} >
                    <div><b>Cód: </b>{item.id}</div>
                    <div><b>Descrição: </b>{item.displayName}</div>
                </div>
              ))}
            </div>
          )}

          {/* Icone da lupa  */}
          <img src={iconSearch} alt="" style={{position: 'absolute', top: '50%', right: '10px',transform: 'translateY(-50%)'}} />
          
          {/* Input associado para armazenar o valor selecionado */}
          <input type="hidden" name={data.attributes?.name || data.attributes?.id} value={selectedOptionId || ''} /> 
        </div>

    </div>
  )
}