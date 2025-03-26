
import { useState } from 'react'
import { useListContext } from './context'
import { useFormContext } from '../Form/context'
import { PaginatedListLinksType } from './types'

import SearchBar from '@components/Bootstrap/SearchBar'
import PaginationBar from '@components/Bootstrap/PaginationBar/'
import Loading from '@components/Bootstrap/Loading'
import Button from '@components/Bootstrap/Button'
import Icon from '@components/Bootstrap/Icon'
import ListTable from '@components/Bootstrap/ListTable'
import ListInputsDragDrop from '@components/Bootstrap/ListInputsDragDrop'


export default function Index() {  
  const [listViewMode, setListViewMode] = useState('listInputsDragDrop')
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
      </Button>,

      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => { setListViewMode('listTable')}}
      >
        <Icon name="bi bi-list" size={16} />
      </Button>,
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => { setListViewMode('listInputsDragDrop')}}
      >
        <Icon name="bi bi-columns-gap" size={16} />
      </Button>
    ]
  }

  const listInputsProps = {
    data: context.state.data?.map((item) => { 
      return {
        id: item.id,
        rules: item.rules || '',
        attributes: JSON.parse(item.attributes),
      }
    }),
    actions: {
      edit: (itemId: string) => {
        formContext.getFormContext(itemId)
        formContext.setStateContext({showModalForm: true})
      },
      remove: (itemId: string) => {
        alert(`remove ${itemId}`)
      },
      activeDeactive: (itemId: string) => {
        alert(`activeDeactive ${itemId}`)
      }
    },
    additionalComponents: []
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

  const listTableProps = {
    data: {
      thead: [
        {name: 'id', displayName: 'ID', style: { width:  '10%' }},
        {name: 'name', displayName: 'Nome'},
      ],
      tbody: context.state.data?.map((item) => { 
        return {
          id: { value: item.id.toString(), node: item.id.toString(), render: true },
          name: { value: item.name.toString(), node: item.name.toString(), render: true },
        }
      })  
    },
    actions: {
      edit: (itemId: string) => {
        formContext.getFormContext(itemId)
        formContext.setStateContext({showModalForm: true})
      },
      remove: (itemId: string) => {
        context.handleDeleteContext(itemId)
      },
      activeDeactive: (itemId: string) => {
        context.handleActiveContext(itemId)
      },
      sort: (sortBy: string, sortDirection: string) => {
        context.handleSortContext(sortBy, sortDirection)
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
        <Loading isLoading={isLoading} />
        { !isLoading && ( 
          <>
            {listViewMode == 'listInputsDragDrop' && (
              <>
                <br/>
                <ListInputsDragDrop
                  data={listInputsProps.data} 
                  actions={listInputsProps.actions} 
                />
              </>
            )}

            {listViewMode == 'listTable' && (
              <>
                <ListTable
                  data={listTableProps.data} 
                  actions={listTableProps.actions} 
                  additionalComponents={listTableProps.additionalComponents}
                />
                <PaginationBar 
                  data={paginationBarProps.data} 
                  actions={paginationBarProps.actions} 
                  additionalComponents={paginationBarProps.additionalComponents}
                />
              </>
            )}
          </>
        )}
    </>
  )
}
