import { useState, FormEvent } from "react";
import svgLoadingWhite from '@assets/loading-white-sm.svg'

type actionsType = {
    handleSearchAction: (searchParams: object) => void;
}

export default function Index({actions, additionalComponents = []} : {actions: actionsType; additionalComponents?: []}) {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(!inputValue){
        actions.handleSearchAction({name: '', paginate: '10'})
        return
    }
    setLoading(true) 
    actions.handleSearchAction({name: inputValue, paginate: '10'});
    setLoading(false) 
  }

  return (
    <section>
      <div className="d-flex">
        
        <div style={{width: "100%", display: "flex",  justifyContent: "space-between"}}>
          Componentes adicionais
          {additionalComponents && (
            <div className="d-flex pr-2 w-50" style={{justifyContent: additionalComponents.length > 1 ? 'space-between' : 'end' }}>
                {additionalComponents &&  additionalComponents.map((item) => (item))}
            </div>
          )}
        </div>
        
        <div style={{width: "100%"}}>
          <form onSubmit={handleSubmit}>
            <div className="row justify-content-end">
              <div className="col-md-12">
                <div className="input-group mb-3">
                  <input 
                    name="searchParam" 
                    type="text" 
                    className="form-control" 
                    placeholder="Pesquisar" 
                    value={inputValue}
                    onChange={(e) =>  setInputValue(e.target.value)}
                    />
                  <div className="input-group-append">
                      {!loading && (
                        <button type="submit" className="btn btn-warning">
                          <i className="fs-7 bi-search"></i>
                        </button>
                      )}
                      {loading && (
                        <button className="btn btn-secondary">
                          <img src={svgLoadingWhite} />
                        </button>
                      )}
                  </div>
                </div> 
              </div>
            </div>
          </form>
        </div>
        
      </div>
    </section>
  );
}
