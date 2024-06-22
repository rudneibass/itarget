import axios from 'axios';
import { useEffect } from 'react'

import svgLoadingGray from '@assets/loading-gray-md.svg'
import CustomCard from '@components/CustomCard'
import SearchBar from '@components/SearchBar/index'
import PaginationBar from '@components/PaginationBar/index'

import { endpoints } from '@utils/endpoints'
import { registrationApi } from '@services/backendApi/registrationApi'

import { useRegistrationListContext } from './context'

export default function Index() {  
  const context = useRegistrationListContext()

  const searchBarProps = {
    data: [],
    actions: {
      handleSearchAction: async (params:string) => {
        context.setLoadingContext({loading: true})
        const searchResponse = await registrationApi.paginate(`${endpoints.registration.endpoint}${endpoints.registration.actions.paginate}`)
        context.setDataContext({data: searchResponse.data, cache: true})
        context.setPaginationLinksContext({paginationLinks: searchResponse.links})
        context.setLoadingContext({loading: false})

        console.log(params)
      },   
    }
  }

  const paginationBarProps = {
    data: context.paginationLinks,
    actions: {
      handlePaginateAction: async (url: string) => {
        try {
          const response = await axios.get(url);
          const response_data = response.data.response_data[0];
          context.setDataContext(response_data.data)
          context.setPaginationLinksContext(response_data.links)
        } catch (error) {
          console.error(error);
        }
      }   
    }
  }

  useEffect(() => {
    searchBarProps.actions.handleSearchAction('');
  }, [])

  return (
    <div>
      <CustomCard cardTitle='Inscrições' shortDescription='Lista de incrições'>
        <SearchBar actions={searchBarProps.actions} />

          <section>
            <div className="table-responsive" style={{height: "40vh", overflowY: "scroll"}}>
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th scope="col"><small>nome</small></th>
                    <th scope="col"><small>Email</small></th>
                    <th scope="col"><small>Cpf</small></th>
                  </tr>
                </thead>
                <tbody>
                  {context.data && context.data.length > 0 && !context.loading && (
                    context.data!.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.cpf}</td>
                      </tr>
                    ))
                  )}    
                </tbody>
              </table>
              {context.data?.length == 0 && !context.loading && (
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
          </section>

          <PaginationBar data={paginationBarProps.data} actions={paginationBarProps.actions} />
      </CustomCard>
    </div>
  )
}
