
import { useListContext } from './context'
import { PaginatedListLinksType } from './types'

import { QuickSearch } from '@components/Bootstrap/QuickSearch'
import PaginationBar from '@components/Bootstrap/PaginationBar/'
import ListTable from '@components/Bootstrap/ListTable'
import Loading from '@components/Bootstrap/Loading'

import Form from '@pages/Form/Form'

export default function Index() {  
  const context = useListContext()
  const isLoading = context.state.isLoading

  const quickSearchProps = {
    data: {
      searchBy: [
        {value: 'name', label: 'Nome'}
      ]
    },
    actions: {
      handleSearchAction: async (searchParams: object) => {
        context.handleSearchContext(searchParams)
      },   
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
        context.renderFormTab({ 
          title: 'Editar Formulário', 
          eventKey: 'tab-edit-form', 
          content: <Form id={itemId} />
        })
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

  const paginationBarProps = {
    data: {paginationLinks: context.state.paginationLinks},
    actions: {
      handlePaginateAction: ({ data, paginationLinks }: { data:[], paginationLinks: Array<PaginatedListLinksType> }) => {
        context.setStateContext({ data, paginationLinks })
      }   
    },
    additionalComponents: []
  }

  return (
    <>
      <QuickSearch.Root data={quickSearchProps.data} actions={quickSearchProps.actions}>
        <QuickSearch.ShowInactive />
      </QuickSearch.Root>
      { isLoading && (<Loading />) }
      { !isLoading && ( 
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
  )
}
