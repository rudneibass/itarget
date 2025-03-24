
import { useListContext } from './context'
import { PaginatedListLinksType } from './types'

import { PageContainer } from '@components/Bootstrap/PageContainer'
import { QuickSearch } from '@components/Bootstrap/QuickSearch'
import PaginationBar from '@components/Bootstrap/PaginationBar/'
import ListTable from '@components/Bootstrap/ListTable'
import Loading from '@components/Bootstrap/Loading'
import Button from '@components/Bootstrap/Button'
import Icon from '@components/Bootstrap/Icon'


import Form from '@pages/Form/Form'

export default function Index() {  
  const context = useListContext()
  const isLoading = context.state.isLoading

  const pageContainerHeadProps = {
    title:'Formulários',
    shortDescription:
    <>
      <i className="fs-7 bi-house"></i>&nbsp;&nbsp;
      <small className="text-muted" >
         {'> Cadastros > Formulários'}
      </small> 
    </>
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
      <PageContainer.Root>
        <PageContainer.Head title={pageContainerHeadProps.title} shortDescription={pageContainerHeadProps.shortDescription}>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() =>
              context.renderFormTab({
                title: "Novo Formulário",
                eventKey: "tab-new-form",
                content: <Form />,
              })
            }
          >
            <Icon name="bi bi-plus-circle" size={16} />
            &nbsp;&nbsp;
            Cadastrar
          </Button>
        </PageContainer.Head>

        <PageContainer.Boddy>
          
          <Loading isLoading={isLoading} />

          <QuickSearch.Root data={searchBarProps.data} actions={searchBarProps.actions}>
            <QuickSearch.ShowInactive />
          </QuickSearch.Root>

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
 
        </PageContainer.Boddy>
      </PageContainer.Root>
    </>
  )
}
