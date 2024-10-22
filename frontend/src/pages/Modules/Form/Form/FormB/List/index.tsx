
import { useListContext } from './context'
import { LaravelPaginationLinksType } from '@services/backendApi/baseApi/types'
import { useFormContext } from '../Form/context'

import SearchBar from '@components//Bootstrap/SearchBar'
import PaginationBar from '@components/Bootstrap/PaginationBar/'
import ListTable from '@components/Bootstrap/ListTable'
import Loading from '@components/Bootstrap/Loading'

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
      <button 
        className='btn btn-sm btn-outline-primary'  
        onClick={() => {
          formContext.getFormContext()
          formContext.setShowModalFormContext(true)
      }}>
        <i className="fs-7 bi-save"></i>&nbsp;
        Add Campo
      </button>
    ]
  }

  const listTableProps = {
    data: {
      thead: [
        { name: 'id', displayName: 'ID', style: { width:  '10%' } },
        { name: 'order', displayName: 'Ordem', style: { width:  '10%' } },
        { name: 'name', displayName: 'Nome', style: { width:  '10%' } },
        { name: 'attributes', displayName: 'Atributos'  },
      ],
      tbody: context.state.data?.map((item) => { 
        return {
          id: { value: item.id.toString(), node: item.id.toString(), render: true },
          order: { value: item.order.toString(), node: item.order.toString()+'º', render: true },
          name: { value: item.name.toString(), node: item.name.toString(), render: true },
          attributes: { value: JSON.stringify(item.attributes), node: <i className='text-muted'>{JSON.stringify(item.attributes)}</i>, render: true },
        }
      })
    },
    actions: {
      handleEditAction: (itemId: string) => {
        formContext.getFormContext(itemId)
        formContext.setShowModalFormContext(true)
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

  const paginationBarProps = {
    data: {paginationLinks: context.state.paginationLinks},
    actions: {
      handlePaginateAction: ({ data, paginationLinks }: { data:[], paginationLinks: LaravelPaginationLinksType[] }) => {
        context.setStateContext({ data, paginationLinks })
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
