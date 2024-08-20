import { useNavigate } from 'react-router-dom'

import { endpoints } from '@utils/endpoints'
import { registrationApi } from '@services/backendApi/registrationApi'
import { useRegistrationListContext } from './context'

import CustomCard from '@components/Bootstrap/CustomCard'
import SearchBar from '@components//Bootstrap/SearchBar'
import PaginationBar from '@components/Bootstrap/PaginationBar/'
import ListTable from '@components/Bootstrap/ListTable';

import { LaravelPaginationLinksType } from '@services/backendApi/baseApi/types'
import { isObject } from '@utils/isObject'
import { isLaravelPaginationType } from '@src/types'
import { Link } from 'react-router-dom'

export default function Index() {  
  const context = useRegistrationListContext()
  const navigate = useNavigate()

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
      <Link to='/registration/form' className='btn btn-sm btn-outline-primary'>
        <i className='fs-7 bi-plus-circle'></i>&nbsp;&nbsp;Cadastrar
      </Link>
    ],
    styles: {
      card: { borderTop: 'none' },
      cardHeader: { border: "none", background: "#fff" },
      cardBody: { minHeight: '60vh', overflowY: "auto" as const }
    }
  }

  const searchBarProps = {
    data: {},
    actions: {
      handleSearchAction: async (searchParams: object) => {
        const response = await registrationApi.search(`${endpoints.registration.endpoint}${endpoints.registration.actions.search}`, searchParams)
        if(response && isObject(response) && response.data){
          if(isLaravelPaginationType(response.data)){
            context.setDataContext({data: response.data.data, cache: true})
            context.setPaginationLinksContext({paginationLinks: response.data.links})
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
      tbody: context.data?.map((item) => { 
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
        navigate(`../registration/form/${itemId}`)
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
    data: {paginationLinks: context.paginationLinks},
    actions: {
      handlePaginateAction: ({data, paginationLinks}: {data:[], paginationLinks: LaravelPaginationLinksType[]}) => {
          context.setDataContext({data: data})
          context.setPaginationLinksContext({paginationLinks:  paginationLinks})
      }   
    },
    additionalComponents: []
  }

  return (
    <>
      <CustomCard data={customCardProps.data} actions={customCardProps.actions} additionalComponents={customCardProps.additionalComponents} styles={customCardProps.styles}>
        <SearchBar data={searchBarProps.data} actions={searchBarProps.actions} additionalComponents={searchBarProps.additionalComponents} />
        <ListTable data={listTableProps.data} actions={listTableProps.actions} additionalComponents={listTableProps.additionalComponents} />  
        <PaginationBar data={paginationBarProps.data} actions={paginationBarProps.actions} additionalComponents={paginationBarProps.additionalComponents}/>
      </CustomCard>
    </>
  )
}
