
import { useListContext } from './context'
import { PaginatedListLinksType } from './types'

import ViewB from '@pages/Form/ViewB'

import { QuickSearch } from '@components/Bootstrap/QuickSearch'
import PaginationBar from '@components/Bootstrap/PaginationBar/'
import ListTable from '@components/Bootstrap/ListTable'
import Loading from '@components/Bootstrap/Loading'
import Icon from '@components/Bootstrap/Icon'
import ListCards from '@components/Bootstrap/ListCards'

import Stack from '@components/Bootstrap/Stack'
import Button from '@components/Bootstrap/Button'
import { useState } from 'react'

export default function Index() {  
  const [listViewMode, setListViewMode] = useState('listCards')
  const context = useListContext()
  const isLoading = context.state.isLoading

  const quickSearchProps = {
    data: {
      searchBy: [
        {value: 'name', label: 'Nome'}
      ]
    },
    actions: {
      search: async (searchParams: object) => {
        context.search(searchParams)
      },   
    }
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
          name: { 
            value: item.name.toString().charAt(0).toUpperCase() + item.name.toString().slice(1), 
            node: item.name.toString().charAt(0).toUpperCase() + item.name.toString().slice(1), 
            render: true 
          },
        }
      })  
    },
    actions: {
      remove: (itemId: string) => {
        context.remove(itemId)
      },
      activeDeactive: (itemId: string) => {
        context.activeDeactive(itemId)
      },
      sort: (sortBy: string, sortDirection: string) => {
        context.sort(sortBy, sortDirection)
      },
      reorder: (reorderesData: []) =>{
        context.reorder(reorderesData)
      },
      edit: (itemId: string) => {
        context.addTab({ 
          title: 'Editar Formulário', 
          eventKey: 'tab-edit-form', 
          content: <ViewB id={itemId} />
        })
      }
    }
  }

  const paginationBarProps = {
    data: { 
      paginationLinks: context.state.paginationLinks
    },
    actions: {
      paginate: ({ data, paginationLinks }: { data:[], paginationLinks: Array<PaginatedListLinksType> }) => {
        context.setStateContext({ data, paginationLinks })
      }   
    }
  }

  const listCardProps = {
    data: context.state.data?.map((item) => { 
      return {
        id: item.id.toString(),
        name: <Icon name='bi bi-code-slash' leftLabel={item.name.toString().charAt(0).toUpperCase() + item.name.toString().slice(1)}/>,
        description: 'A short description about this form',
      }
    }),
    actions: {
      remove: (itemId: string) => {
        context.remove(itemId)
      },
      activeDeactive: (itemId: string) => {
        context.activeDeactive(itemId)
      },
      sort: (sortBy: string, sortDirection: string) => {
        context.sort(sortBy, sortDirection)
      },
      reorder: (reorderesData: []) =>{
        context.reorder(reorderesData)
      },
      edit: (itemId: string) => {
        context.addTab({ 
          title: 'Editar Formulário', 
          eventKey: 'tab-edit-form', 
          content: <ViewB id={itemId} />
        })
      }
    }
  }

  return (
    <>
      <Loading isLoading={isLoading}/>
      <QuickSearch.Root 
        data={quickSearchProps.data} 
        actions={quickSearchProps.actions}
      >
        <Stack direction="horizontal" gap={2}>
          <Button variant="outline-primary" size="sm" onClick={() => { setListViewMode('listTable')}}>
            <Icon name="bi bi-list" size={16} />
          </Button>
          <Button variant="outline-primary" size="sm" onClick={() => { setListViewMode('listCards')}}>
            <Icon name="bi bi-card-heading" size={16} />
          </Button>
        </Stack>
      </QuickSearch.Root>
      <div style={{height: '54vh', overflowY: 'scroll', overflowX: 'hidden'}}>
         { !isLoading && ( 
            <>
              {listViewMode == 'listCards' && (
                <>
                  <ListCards 
                    data={listCardProps.data} 
                    actions={listCardProps.actions} 
                  />
                </>
              )}
        
              {listViewMode == 'listTable' && (
                <>
                  <ListTable 
                    data={listTableProps.data} 
                    actions={listTableProps.actions} 
                  />
                </>
              )}
            </>
          )}
        {/*}
        <ListTable 
          data={listTableProps.data} 
          actions={listTableProps.actions} 
        /> 
        */}

        
      </div>
      <PaginationBar 
        data={paginationBarProps.data} 
        actions={paginationBarProps.actions} 
      />
    </>
  )
}
