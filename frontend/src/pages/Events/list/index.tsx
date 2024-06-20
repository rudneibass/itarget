import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import svgLoadingGray from '@assets/loading-gray-md.svg'
import CustomCard from '@components/CustomCard'

import { dateFormat } from '@utils/index'
import { endpoints } from '@utils/endpoints'

import { eventApi } from '@services/backendApi/eventApi'
import useEventListContext from './context'

export default function Index() {
  const context = useEventListContext()

  useEffect(()=> {
    async function getData(){
      context.setLoadingContext(true)

      const response = await eventApi.list(`${endpoints.event.endpoint}${endpoints.event.actions.list}`)
      context.setDataContext(response)

      if(context.data?.length === 0){
        context.setThereIsNoDataContext(true)
      }

      context.setLoadingContext(false)
    }
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
                  {context.data && context.data.length > 0 && (
                    context.data!.map((item, index) => (
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
              
              {context.thereIsNoData && !context.loading && (
                <div className="alert alert-secondary text-center">
                  Não há dados cadastrados!
                </div>
              )}

              {context.loading && (
                <div className="alert alert-secondary text-center">
                  <img src={svgLoadingGray} />
                </div>
              )}
              
            </div>

            <div className="d-flex justify-content-between p-1">
                <small>Total de registros: {context.data && (context.data.length )} {!context.data && (0)}</small>
                <small>Página 1 de 1</small>
            </div>

          </section>

      </CustomCard>
    </div>
  )
}
