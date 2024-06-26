import axios from 'axios';
import { useEffect } from 'react'

import CustomCard from '@components/CustomCard'
import SearchBar from '@components/SearchBar/index'
import PaginationBar from '@components/PaginationBar/index'

import { endpoints } from '@utils/endpoints'
import { registrationApi } from '@services/backendApi/registrationApi'

import { useRegistrationListContext } from './context'
import ListTable from '@components/ListTable';

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
          context.setDataContext({data: response_data.data})
          context.setPaginationLinksContext({paginationLinks: response_data.links})
        } catch (error) {
          console.error(error);
        }
      }   
    }
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
    }
  }

  useEffect(() => {
    searchBarProps.actions.handleSearchAction('');
  }, [])

  return (
    <div>
      <CustomCard cardTitle='Inscrições' shortDescription='Lista de incrições'>
        <SearchBar actions={searchBarProps.actions} />
        <ListTable data={listTableProps.data} actions={listTableProps.actions}/>  
        <PaginationBar data={paginationBarProps.data} actions={paginationBarProps.actions} />
      </CustomCard>
    </div>
  )
}
