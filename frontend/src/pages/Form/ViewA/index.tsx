import { PageContainer } from '@components/Bootstrap/PageContainer'
import Icon from '@components/Bootstrap/Icon'

import { ListContextProvider } from './List/context'
import List from './List/index'

export default function Index() {  

  return (
    <>
      <PageContainer.Root>
        <PageContainer.Head 
          title='Formulários' 
          shortDescription={<Icon name="bi bi-house text-muted" size={16} 
          rightLabel='> Cadastros > Formulários' />}
        />
        <PageContainer.Boddy>
          <ListContextProvider>
            <List />
          </ListContextProvider>
        </PageContainer.Boddy>
      </PageContainer.Root>
    </>
  )
}
