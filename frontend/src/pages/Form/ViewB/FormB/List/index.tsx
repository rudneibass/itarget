
import { useState } from 'react'
import { useListContext } from './context'
import { useFormContext } from '../Form/context'

import { QuickSearch } from '@components/Bootstrap/QuickSearch'
import Loading from '@components/Bootstrap/Loading'
import Stack from '@components/Bootstrap/Stack'
import Button from '@components/Bootstrap/Button'
import Icon from '@components/Bootstrap/Icon'
import ListTable from '@components/Bootstrap/ListTable'
import ListInputsDragDrop from '@components/Bootstrap/ListInputsDragDrop'


export default function Index() {  
  const [listViewMode, setListViewMode] = useState('listInputsDragDrop')
  const formContext = useFormContext()
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

  const listInputsDragDropProps = {
    data: context.state.data?.map((item) => { 
      return {
        id: item.id,
        rules: item.rules || '',
        attributes: JSON.parse(item.attributes),
      }
    }),
    actions: {
      edit: (itemId: string) => {
        formContext.edit(itemId)
      },
      remove: (itemId: string) => {
        context.remove(itemId)
      },
      activeDeactive: (itemId: string) => {
        context.activeDeactive(itemId)
      },
      reorder: (reorderedData: []) => {
        context.reorder(reorderedData)
      }
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
      edit: (itemId: string) => { formContext.edit(itemId) },
      remove: (itemId: string) => { context.remove(itemId) },
      activeDeactive: (itemId: string) => { context.activeDeactive(itemId) },
      sort: (sortBy: string, sortDirection: string) => { context.sort(sortBy, sortDirection) }
    },
    additionalComponents: []
  }
  
  return (
    <>      
      <Loading isLoading={isLoading}/>
      <QuickSearch.Root data={quickSearchProps.data} actions={quickSearchProps.actions}>
        <Stack direction="horizontal" gap={2}>
          <Button variant="outline-primary" size="sm" onClick={() => { formContext.addNew() }}>
            <Icon name="bi bi-plus-circle" size={16} />
            &nbsp;
            Cadastrar
          </Button>
          <Button variant="outline-primary" size="sm" onClick={() => { setListViewMode('listTable')}}>
            <Icon name="bi bi-list" size={16} />
          </Button>
          <Button variant="outline-primary" size="sm" onClick={() => { setListViewMode('listInputsDragDrop')}}>
            <Icon name="bi bi-columns-gap" size={16} />
          </Button>
        </Stack>
      </QuickSearch.Root>

      { !isLoading && ( 
        <>
          {listViewMode == 'listInputsDragDrop' && (
            <>
              <br/>
              <ListInputsDragDrop
                data={listInputsDragDropProps.data} 
                actions={listInputsDragDropProps.actions} 
              />
            </>
          )}

          {listViewMode == 'listTable' && (
            <>
              <div style={{height: '51vh', overflowY: 'scroll', overflowX: 'auto'}}>
                <ListTable
                  data={listTableProps.data} 
                  actions={listTableProps.actions} 
                  additionalComponents={listTableProps.additionalComponents}
                />
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}
