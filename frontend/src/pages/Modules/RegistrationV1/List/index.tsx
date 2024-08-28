import { endpoints } from '@utils/endpoints'
import { registrationApi } from '@services/backendApi/registrationApi'
import { useRegistrationListContext } from './context'

import CustomCard from '@components/Bootstrap/CustomCard'
import SearchBar from '@components//Bootstrap/SearchBar'
import PaginationBar from '@components/Bootstrap/PaginationBar/'
import ListTable from '@components/Bootstrap/ListTable'
import Loading from '@components/Bootstrap/Loading'

import { LaravelPaginationLinksType } from '@services/backendApi/baseApi/types'
import { isObject } from '@utils/isObject'
import { isLaravelPaginationType } from '@src/types'

import RegistrationForm from '@pages/Modules/Registration/Form'

export default function Index() {  
  const context = useRegistrationListContext()
  const isLoading = context.state.isLoading

  const customCardProps = {
    data: {
      title:'Inscrições', 
      shortDescription:
      <>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <i className="fs-7 bi-house"></i>&nbsp;&nbsp;
        <small className="text-muted" >
           {'> Cadastros > Inscrições'}
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
          content: <RegistrationForm />
        })}
      >
        <i className='fs-7 bi-plus-circle'></i>&nbsp;&nbsp;Cadastrar
      </button>
    ],
    styles: {
      card: { borderTop: 'none' },
      cardHeader: { border: "none", background: "#fff" },
      cardBody: { minHeight: '60vh', overflowY: "auto" as const, position: "relative" as const }
    }
  }

  const searchBarProps = {
    data: {},
    actions: {
      handleSearchAction: async (searchParams: object) => {
        const response = await registrationApi.search(`${endpoints.registration.endpoint}${endpoints.registration.actions.search}`, searchParams)
        if(response && isObject(response) && response.data){
          if(isLaravelPaginationType(response.data)){
            context.setStateContext({data: response.data.data, paginationLinks: response.data.links})
          }
      }
      },   
    },
    additionalComponents: []
  }

  const listTableProps = {
    data: {
      thead: [
        {name: 'id', displayName: 'ID'},
        {name: 'name', displayName: 'Nome'},
        {name: 'email', displayName: 'Email'},
        {name: 'cpf', displayName: 'Cpf'}
      ],
      tbody: context.state.data?.map((item) => { 
        return {
          id: item.id.toString(),
          name: item.name.toString(),
          email: item.email.toString(),
          cpf: item.cpf.toString()
        }
      })
    },
    actions: {
      handleEditAction: (itemId: string) => {
        context.renderFormTab({ 
          title: 'Editar Inscrição', 
          eventKey: 'tab-edit-registration', 
          content: <RegistrationForm id={itemId} />
        })
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
      handlePaginateAction: ({ data, paginationLinks }: {data:[], paginationLinks: LaravelPaginationLinksType[]}) => {
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
        styles={customCardProps.styles}
      >
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
      </CustomCard>
    </>
  )
}
