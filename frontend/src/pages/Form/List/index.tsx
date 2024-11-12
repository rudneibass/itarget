
import { useListContext } from './context'
import { PaginatedListLinksType } from './types'

import Form from '@pages/Form/Form'

import CustomCard from '@components/Bootstrap/CustomCard'
import SearchBar from '@components//Bootstrap/SearchBar'
import PaginationBar from '@components/Bootstrap/PaginationBar/'
import ListTable from '@components/Bootstrap/ListTable'
import Loading from '@components/Bootstrap/Loading'




export default function Index() {  
  const context = useListContext()
  const isLoading = context.state.isLoading

  const customCardProps = {
    data: {
      title:'Formulários',
      shortDescription:
      <>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <i className="fs-7 bi-house"></i>&nbsp;&nbsp;
        <small className="text-muted" >
           {'> Cadastros > Formulários'}
        </small> 
      </>
    },
    actions: {},
    additionalComponents: [
      <button 
        type='button' 
        className='btn btn-sm btn-outline-primary' 
        onClick={() => context.renderFormTab({ 
          title: 'Novo Formulário', 
          eventKey: 'tab-new-form', 
          content: <Form />
        })}
      >
        <i className='fs-7 bi-plus-circle'></i>&nbsp;&nbsp;Cadastrar
      </button>
    ],
  }

  const searchBarProps = {
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
      handleEditAction: (itemId: string) => {
        context.renderFormTab({ 
          title: 'Editar Formulário', 
          eventKey: 'tab-edit-form', 
          content: <Form id={itemId} />
        })
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
      handlePaginateAction: ({ data, paginationLinks }: { data:[], paginationLinks: Array<PaginatedListLinksType> }) => {
        context.setStateContext({ data, paginationLinks })
      }   
    },
    additionalComponents: []
  }

  return (
    <>
      <CustomCard 
        data={customCardProps.data} 
        actions={customCardProps.actions} 
        additionalComponents={customCardProps.additionalComponents} 
      >
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
      </CustomCard>
    </>
  )
}
