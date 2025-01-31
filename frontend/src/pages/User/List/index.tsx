import { useListContext } from './context'
import { PaginatedListLinksType } from './types'

import UserForm from '@pages/User/Form'

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
      title:'Usuários', 
      shortDescription:
      <>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <i className="fs-7 bi-house"></i>&nbsp;&nbsp;
        <small className="text-muted" >
           {'> Cadastros > Usuários'}
        </small> 
      </>
    },
    actions: {},
    additionalComponents: [
      <button 
        type='button' 
        className='btn btn-sm btn-outline-primary' 
        onClick={() => context.renderFormTab({ 
          title: 'Nova Inscrição', 
          eventKey: 'tab-new-registration', 
          content: <UserForm />
        })}
      >
        <i className='fs-7 bi-plus-circle'></i>&nbsp;&nbsp;Cadastrar
      </button>
    ]
  }

  const searchBarProps = {
    data: {
      searchBy: [
        {value: 'name', label: 'Nome'},
        {value: 'email', label: 'Email'},
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
        { name: 'id', displayName: 'ID', style: {width: '10%'} },
        { name: 'name', displayName: 'Nome', style: {width: '20%'} },
        { name: 'email', displayName: 'Email', style: {width: '30%'} },
        { name: 'cpf', displayName: 'Cpf' }
      ],
      tbody: context.state.data?.map((item) => { 
        return {
          id: { 
            value: item.id.toString(), 
            node: <span className='text-muted'>{item.id.toString()}</span>, 
            render: true 
          },
          name: { 
            value: item.name.toString(), 
            node: item.name.toString(), 
            render: true 
          },
          email: { 
            value: item.email.toString(), 
            node: <span className='text-muted'>{item.email.toString()}</span>, 
            render: true 
          },
          cpf: { 
            value: item.cpf.toString(), 
            node: <span className='text-muted'>{item.cpf.toString()}</span>, 
            render: true 
          },
        }
      })
    },
    actions: {
      handleEditAction: (itemId: string) => {
        context.renderFormTab({ title: 'Editar Inscrição', eventKey: 'tab-edit-registration', content: <UserForm id={itemId} />})
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
    data: { paginationLinks: context.state.paginationLinks },
    actions: {
      handlePaginateAction: ({ data, paginationLinks } : { data:[], paginationLinks: Array<PaginatedListLinksType> }) => {
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
