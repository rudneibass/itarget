
import { PageContainer } from '@components/Bootstrap/PageContainer'
import { useMainTabsContext } from "@components/Bootstrap/MainTabs/context"
import Button from '@components/Bootstrap/Button'
import Icon from '@components/Bootstrap/Icon'

import ViewB from '@pages/Form/ViewB'

import { ListContextProvider } from './List/context'
import List from './List/index'

export default function Index() {  
  const mainTabsContext = useMainTabsContext()

  return (
    <>
      <PageContainer.Root>
        <PageContainer.Head title='Formulários' shortDescription={<Icon name="bi bi-house text-muted" size={16} labelRight='> Cadastros > Formulários' />}>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() =>
              mainTabsContext.addTab({
                title: "Novo Formulário",
                eventKey: "tab-new-form",
                content: <ViewB />,
              })
            }
          >
            <Icon name="bi bi-plus-circle" size={16} />
            &nbsp;&nbsp;
            Cadastrar
          </Button>
        </PageContainer.Head>
        <PageContainer.Boddy>
          <ListContextProvider>
            <List />
          </ListContextProvider>
        </PageContainer.Boddy>
      </PageContainer.Root>
    </>
  )
}
