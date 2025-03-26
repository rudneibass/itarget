import { useState, FormEvent, ReactNode } from "react";
//import svgLoadingWhite from '@assets/loading-white-sm.svg'

type SearchBarPropsType = {
  data?: {
    searchBy: Array<Record<string, string>>
  },
  actions?: {
    handleSearchAction: (searchParams: object) => void;
  },
  additionalComponents?: Array<ReactNode>
}

export default function Index({data, actions, additionalComponents} : SearchBarPropsType) {
  const [inputValue, setInputValue] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(actions?.handleSearchAction){
      actions.handleSearchAction({name: inputValue, paginate: '10'});
    } 
  }

  return (
    <section>
      <div className="d-flex">
        
        <div className={`d-flex width-${data?.searchBy ? '80' : '100'}`}>

          {additionalComponents &&  additionalComponents.map((item) => (
            <div className="d-flex mb-3" style={{paddingRight: '10px'}}>
              {item} 
            </div>
          ))}

          {/*}
          <div className="d-flex align-items-end">
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">
                Exibir Inativos
              </label>
            </div>
          </div>  
          */}
          
        </div> 
        
        <div className="width-100">
          <form onSubmit={handleSubmit}>
            <div className="row justify-content-end">
              {data?.searchBy && (
                <div className="col-md-3">
                  <div className="form-group mb-3">
                    <select className="form-control form-select ">
                      <option value="">Pesquisar por...</option>
                      {data.searchBy.map((item, index) => <option key={index} value={item.value}>{item.label}</option>)}
                    </select>
                  </div>
                </div>
              )}
              <div className={`col-md-${data?.searchBy ? '9' : '12'}`}>
                <div className="input-group mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Pesquisar" 
                    value={inputValue}
                    onChange={(e) =>  setInputValue(e.target.value)}
                    />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-warning">
                      <i className="fs-7 bi-search"></i>
                      {/* <img src={svgLoadingWhite} alt="loding-spinner" loading="lazy"/> */ }
                    </button>
                  </div>
                </div> 
              </div>
            </div>
          </form>
        </div>
      
      </div>
    </section>
  )
}
