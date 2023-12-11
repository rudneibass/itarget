import { useEffect, useState } from 'react'
import { apiEvents } from '../../services/apiEvents'
import { EventInterface } from '../../services/apiEvents/types'
import svgLoadingGray from '../../assets/loading-gray-md.svg'
import CustomCard from '../../components/CustomCard'
import { Link } from 'react-router-dom'
import { dateFormat } from '../../utils'

export default function Index() {
  const [data, setData] = useState<EventInterface []>()
  const [loading, setLoading] = useState(false)
  const [thereIsNoData, setThereIsNoData] = useState(false)
  const [performSearch, setPerformSearch] = useState(false)
  

  async function getData(){
    if(!performSearch){
      setLoading(true) 
      const response = await apiEvents.list()
      setData(response) 

      if(data?.length == 0){
        setThereIsNoData(true)
      }
    }
    setLoading(false) 
  }

  useEffect(()=> {
    getData()
  }, [])

  return (
    <div>
      <CustomCard cardTitle='Eventos' shortDescription='Inscreva-se em um evento'>
      <section>
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th scope="col"><small>Evento</small></th>
                    <th scope="col"><small>Data de início</small></th>
                    <th scope="col"><small>Data de encerramento</small></th>
                    <th scope="col" className="width-15 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0 && (
                    data!.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{dateFormat(item.start_date)}</td>
                        <td>{dateFormat(item.end_date)}</td>
                        <td className="text-center">
                          {item.status === '1' && (
                            <Link to={`/inscricoes/${item.id}`} className="btn btn-sm btn-danger">
                               <i className="fs-7 bi-pencil"></i> Inscreva-se
                            </Link> 
                          )} 
                          {item.status === '0' && (
                            <button type="button" className="btn btn-sm btn-secondary">
                               <i className="fs-7 bi-clock"></i> Encerrado
                            </button> 
                          )} 
                        </td>
                      </tr>
                    ))
                
                  )}
                    
                </tbody>
              </table>
              
              {thereIsNoData && !loading && (
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

            <div className="d-flex justify-content-between p-1">
                <small>Total de registros: {data && (data.length )} {!data && (0)}</small>
                <small>Página 1 de 1</small>
            </div>

          </section>

      </CustomCard>
    </div>
  )
}
