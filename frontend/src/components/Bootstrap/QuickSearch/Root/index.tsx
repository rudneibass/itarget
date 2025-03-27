import { useState, FormEvent, ReactNode} from "react";

type QuickSearchPropsType = {
  data: { searchBy: Array<Record<string, string>> },
  actions?: { search: (searchParams: object) => void;},
  children?: ReactNode
}

export default function Root({data, actions, children} : QuickSearchPropsType) {
  const [inputValue, setInputValue] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(actions?.search){
      actions.search({name: inputValue, paginate: '10'});
    } 
  }

  return (
    <section>
      <div className="d-flex">
        <div className={`d-flex width-100`}>
          {children}
        </div>         
        <div className="width-100">
          <form onSubmit={handleSubmit}>
            <div className="row justify-content-end">
                <div className="col-md-3">
                  <div className="form-group mb-3">
                    <select className="form-control form-select ">
                      <option value="">Pesquisar por...</option>
                      {data.searchBy.map((item, index) => 
                        <option key={index} value={item.value}>{item.label}</option>
                      )}
                    </select>
                  </div>
                </div>
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
