import { registrationApi } from '@services/backendApi/registrationApi'
import { useListContext } from './context'

import { LaravelPaginationLinksType } from '@services/backendApi/baseApi/types'
import { isObject } from '@utils/isObject'
import { isPaginatedListType } from './types'

import SearchBar from '@components//Bootstrap/SearchBar'
import PaginationBar from '@components/Bootstrap/PaginationBar/'
import ListTable from '@components/Bootstrap/ListTable'
import Loading from '@components/Bootstrap/Loading'
import { formFieldApi } from '@services/backendApi/formFieldApi'

import { useFormContext } from '../Form/context'

export default function Index() {  
  const formContext = useFormContext()
  const context = useListContext()
  const isLoading = context.state.isLoading

  const searchBarProps = {
    data: {},
    actions: {
      handleSearchAction: async (searchParams: object) => {
        if(context.state.formId){
          const params = {...searchParams, form_id: context.state.formId }
          const response = await registrationApi.search(formFieldApi.endpoints.search, params)
          if(response && isObject(response) && response.data){
            if(isPaginatedListType(response.data)){
              context.setStateContext({data: response.data.data, paginationLinks: response.data.links})
            }
          }
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
        { isLoading && (<Loading />) }
        { !isLoading && ( 
          <>
            <SearchBar 
              data={searchBarProps.data} 
              actions={searchBarProps.actions} 
              additionalComponents={searchBarProps.additionalComponents} 
            />
            <ListTable 
              data={listTableProps.data} 
              actions={listTableProps.actions} 
              additionalComponents={listTableProps.additionalComponents} 
            />
          </>
        ) }
          
        <PaginationBar 
          data={paginationBarProps.data} 
          actions={paginationBarProps.actions} 
          additionalComponents={paginationBarProps.additionalComponents}
        />
    </>
  )
}
