import { endpoints } from '@utils/endpoints'
import { registrationApi } from '@services/backendApi/registrationApi'
import { useRegistrationListContext } from './context'

import CustomCard from '@components/CustomCard'
import SearchBar from '@components/SearchBar/index'
import PaginationBar from '@components/PaginationBar/index'
import ListTable from '@components/ListTable';
import { LaravelPaginationLinksType } from '@services/backendApi/baseApi/types'

export default function Index() {  
  const context = useRegistrationListContext()

  const customCardProps = {
    data: {
      title:'Inscrições', 
      shortDescription:'Lista de incrições'
    },
    actions: {},
    additionalComponents: []
  }

  const searchBarProps = {
    data: {},
    actions: {
      handleSearchAction: async (searchParams: object) => {
        context.setLoadingContext({loading: true})
        const searchResponse = await registrationApi.search(`${endpoints.registration.endpoint}${endpoints.registration.actions.search}`, searchParams)
        context.setDataContext({data: searchResponse.data, cache: true})
        context.setPaginationLinksContext({paginationLinks: searchResponse.links})
        context.setLoadingContext({loading: false})
      },   
    },
    additionalComponents: []
  }

  const listTableProps = {
    data: {
      tbody: context.data?.map((item) => { 
        return {
          id: item.id.toString(),
          name: item.name.toString(),
          email: item.email.toString(),
          cpf: item.cpf.toString()
        }
      }),
      thead: [
        {name: 'id', displayName: 'ID'},
        {name: 'name', displayName: 'Nome'},
        {name: 'email', displayName: 'Email'},
        {name: 'cpf', displayName: 'Cpf'}
      ]
    },
    actions: {
      handleEditAction: (itemId: string) => {
        alert('Edit item '+itemId)
      },
      handleDeleteAction: (itemId: string) => {
        alert('Delete item '+itemId)
      },
      handleActiveAction: (itemId: string) => {
        alert('Active item '+itemId)
      },
      handleSortAction: (sortBy: string, sortDirection: string) => {
        alert('Sort by '+sortBy+' '+sortDirection)
      }  
    },
    additionalComponents: []
  }

  const paginationBarProps = {
    data: {paginationLinks: context.paginationLinks},
    actions: {
      handlePaginateAction: ({data, paginationLinks}: {data:[], paginationLinks: LaravelPaginationLinksType[]}) => {
          context.setDataContext({data: data})
          context.setPaginationLinksContext({paginationLinks:  paginationLinks})
      }   
    },
    additionalComponents: []
  }

  return (
    <>
      <CustomCard data={customCardProps.data} actions={customCardProps.actions} additionalComponents={customCardProps.additionalComponents}>
        <SearchBar data={searchBarProps.data} actions={searchBarProps.actions} additionalComponents={searchBarProps.additionalComponents} />
        <ListTable data={listTableProps.data} actions={listTableProps.actions} additionalComponents={listTableProps.additionalComponents} />  
        <PaginationBar data={paginationBarProps.data} actions={paginationBarProps.actions} additionalComponents={paginationBarProps.additionalComponents}/>
      </CustomCard>
    </>
  )
}
