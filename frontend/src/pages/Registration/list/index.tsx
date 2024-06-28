import axios from 'axios';

import { endpoints } from '@utils/endpoints'
import { registrationApi } from '@services/backendApi/registrationApi'
import { useRegistrationListContext } from './context'

import CustomCard from '@components/CustomCard'
import SearchBar from '@components/SearchBar/index'
import PaginationBar from '@components/PaginationBar/index'
import ListTable from '@components/ListTable';

export default function Index() {  
  const context = useRegistrationListContext()

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

  const paginationBarProps = {
    data: context.paginationLinks,
    actions: {
      handlePaginateAction: async (url: string) => {
        try {
          const response = await axios.get(url);
          const response_data = response.data.response_data[0];
          context.setDataContext({data: response_data.data})
          context.setPaginationLinksContext({paginationLinks: response_data.links})
        } catch (error) {
          console.error(error);
        }
      }   
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

  const customCardProps = {
    data: {
      title:'Inscrições', 
      shortDescription:'Lista de incrições'
    },
    actions: {},
    additionalComponents: []
  }

  return (
    <>
      <CustomCard data={customCardProps.data} actions={customCardProps.actions} additionalComponents={searchBarProps.additionalComponents}>
        <SearchBar data={searchBarProps.data} actions={searchBarProps.actions} additionalComponents={searchBarProps.additionalComponents} />
        <ListTable data={listTableProps.data} actions={listTableProps.actions} additionalComponents={searchBarProps.additionalComponents} />  
        <PaginationBar data={paginationBarProps.data} actions={paginationBarProps.actions} additionalComponents={searchBarProps.additionalComponents}/>
      </CustomCard>
    </>
  )
}
