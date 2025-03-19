
import { useListContext } from './context'
import { useFormContext } from '../Form/context'
import { PaginatedListLinksType } from './types'

import SearchBar from '@components/Bootstrap/SearchBar'
import PaginationBar from '@components/Bootstrap/PaginationBar/'
import Loading from '@components/Bootstrap/Loading'
import ListCards from '@components/Bootstrap/ListCards'
import Button from '@components/Bootstrap/Button'
import Icon from '@components/Bootstrap/Icon'
import ListInputs from '@components/Bootstrap/ListInputs'
import { useEffect } from 'react'

export default function Index() {  
  const formContext = useFormContext()
  const context = useListContext()
  const isLoading = context.state.isLoading

  const searchBarProps = {
    data: {
      searchBy: [
        {value: 'name', label: 'Nome'}
      ]
    },
    actions: {
      handleSearchAction: async (searchParams: object) => {
        if(context.state.formId){
          context.handleSearchContext(searchParams)
        }
      },   
    },
    additionalComponents: [
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => {
          formContext.getFormContext()
          formContext.setStateContext({showModalForm: true})
        }}
      >
        <Icon name="bi bi-save" size={16} />
        &nbsp;&nbsp;
        Cadastrar
      </Button>
    ]
  }

  const paginationBarProps = {
    data: {paginationLinks: context.state.paginationLinks},
    actions: {
      handlePaginateAction: ({ data, paginationLinks }: { data:[], paginationLinks: Array<PaginatedListLinksType> }) => {
        context.setStateContext({ data, paginationLinks })
      }   
    },
    additionalComponents: []
  }

  const listCardsProps = {
    data: context.state.data?.map((item) => { 
      return {
        id: item.id.toString(),
        name: item.name.toString(),
        description: item.name.toString(),
      }
    }),
    actions: {
      handleEditAction: (itemId: string) => {
        formContext.getFormContext(itemId)
        formContext.setStateContext({showModalForm: true})
      },
      handleDeleteAction: (itemId: string) => {
        context.handleDeleteContext(itemId)
      },
      handleActiveAction: (itemId: string) => {
        context.handleActiveContext(itemId)
      },
      handleSortAction: (sortBy: string, sortDirection: string) => {
        context.handleSortContext(sortBy, sortDirection)
      }
    },
    additionalComponents: []
  }


  const listInputsProps = {
    data: context.state.data?.map((item) => { 
      return {
        id: item.id,
        rules: item.rules || '',
        attributes: JSON.parse(item.attributes) ,
      }
    }),
    actions: {
      handleEditAction: (itemId: string) => {
        formContext.getFormContext(itemId)
        formContext.setStateContext({showModalForm: true})
      }
    },
    additionalComponents: []
  }

  return (
    <>
      <SearchBar 
        data={searchBarProps.data} 
        actions={searchBarProps.actions} 
        additionalComponents={searchBarProps.additionalComponents} 
      />
        { isLoading && (<Loading />) }
        { !isLoading && ( 
          <>
            <br/>
            <ListInputs
              data={listInputsProps.data} 
              actions={listInputsProps.actions} 
              additionalComponents={listInputsProps.additionalComponents}
            />
          </>
        )}
    </>
  )
}
