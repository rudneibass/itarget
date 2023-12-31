import { useEffect, useState, FormEvent } from 'react'
import axios from 'axios';

import { RegistrationInterface } from '../../services/apiRegistrations/types'

import svgLoadingGray from '../../assets/loading-gray-md.svg'
import CustomCard from '../../components/CustomCard'
import { apiRegistrations } from '../../services/apiRegistrations'

export default function Index() {
  const [data, setData] = useState<RegistrationInterface []>()
  const [loading, setLoading] = useState(false)
  const [searchParam, setSearchParam] = useState('')

  const [links, setLinks] = useState([])
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(!searchParam || searchParam === ''){
      getData()
      return
    }
    setLoading(true) 
      const response = await apiRegistrations.search(searchParam)
      setData(response.data) 
      setLinks(response.links)
      setLoading(false) 
  }

async function handlePaginate(url: string){
  try {
    const response = await axios.get(url);
    setData(response.data.data);
    setLinks(response.data.links)
  } catch (error) {
    console.error('Erro na requisição GET:', error);
  } finally {
    setLoading(false);
  }
   
}

  async function getData(){
      setLoading(true) 
      const response = await apiRegistrations.list()
      setData(response.data) 
      setLinks(response.links)
      setLoading(false) 
  }

  useEffect(()=> {
    getData()
  }, [])

  return (
    <div>
      <CustomCard cardTitle='Inscrições' shortDescription='Lista de incrições'>
        <section>
            <form onSubmit={handleSubmit}>
              <div className="row justify-content-end">
                <div className="col-md-5">
                  <div className="input-group mb-3">
                    <input id="serach_param" 
                      name="searchParam" 
                      type="text" 
                      className="form-control" 
                      placeholder="Pesquisar" 
                      value={searchParam}
                      onChange={(e) =>  setSearchParam(e.target.value)}
                      />
                    <div className="input-group-append">
                      <button className="btn bg-warning">
                        <i className="fs-7 bi-search"></i>
                      </button>
                    </div>
                  </div> 
                </div>
              </div>
            </form>
          </section>

          <section>
            <div className="table-responsive" style={{maxHeight: "40vh", overflowY: "scroll"}}>
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th scope="col"><small>nome</small></th>
                    <th scope="col"><small>Email</small></th>
                    <th scope="col"><small>Cpf</small></th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0 && !loading && (
                    data!.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.cpf}</td>
                      </tr>
                    ))
                
                  )}
                    
                </tbody>
              </table>
              
              {data?.length == 0 && !loading && (
                <div className="alert alert-secondary text-center">
                  Não há dados cadastrados!
                </div>
              )}
              

              {loading && (
                <div className="alert alert-secondary text-center">
                  <img src={svgLoadingGray} />
                </div>
              )}
              
            </div>
          </section>
          <section className='mt-3'>
          <div className="d-flex justify-content-between p-1">
                <small>Registros por página: 10</small>
                
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                    {links && links.map((item, index)=>(
                      <li 
                        key={index} 
                        className="page-item"
                      >
                        <a 
                          className="page-link" 
                          onClick={() => handlePaginate(item.url)} 
                          dangerouslySetInnerHTML={{__html: item.label}} 
                          style={{whiteSpace: "nowrap", color: "gray"}} 
                        >
                        </a>
                      </li>
                    ))}

                    </ul>
                  </nav>
                
            </div>
          </section>

      </CustomCard>
    </div>
  )
}
