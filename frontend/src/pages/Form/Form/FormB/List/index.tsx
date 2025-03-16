
import { useListContext } from './context'
import { useFormContext } from '../Form/context'
import { PaginatedListLinksType } from './types'

import SearchBar from '@components/Bootstrap/SearchBar'
import PaginationBar from '@components/Bootstrap/PaginationBar/'
import Loading from '@components/Bootstrap/Loading'
import ListCards from '@components/Bootstrap/ListCards'

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
          formContext.setStateContext({showModalForm: true})
      }}>
        <i className="fs-7 bi-save"></i>&nbsp;
        Add Campo
      </button>
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
            <ListCards
              data={listCardsProps.data} 
              actions={listCardsProps.actions} 
              additionalComponents={listCardsProps.additionalComponents}
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
