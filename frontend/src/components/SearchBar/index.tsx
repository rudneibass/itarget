import { useState, FormEvent, ReactNode } from "react";
//import svgLoadingWhite from '@assets/loading-white-sm.svg'

type SearchBarPropsType = {
  data?: object,
  actions?: {
    handleSearchAction: (searchParams: object) => void;
  },
  additionalComponents?: Array<ReactNode>
}

export default function Index({actions, additionalComponents} : SearchBarPropsType) {
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
        
        <div className="width-100 d-flex p-2" style={{justifyContent: additionalComponents && additionalComponents.length > 1 ? 'space-between' : 'end' }}>
            {additionalComponents &&  additionalComponents.map((item) => (
              <div className="d-flex pr-2">
                {item}
              </div>
            ))}
        </div>
        
        <div className="width-100">
          <form onSubmit={handleSubmit}>
            <div className="row justify-content-end">
              <div className="col-md-12">
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
