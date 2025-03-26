
import { PageContainer } from '@components/Bootstrap/PageContainer'
import { useMainTabsContext } from "@components/Bootstrap/MainTabs/context"
import Button from '@components/Bootstrap/Button'
import Icon from '@components/Bootstrap/Icon'
import Form from '@pages/Form/Form'


import { ListContextProvider } from './List/context'
import List from './List/index'

export default function Index() {  
  const mainTabsContext = useMainTabsContext()
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

  return (
    <>
      <PageContainer.Root>
        <PageContainer.Head title={pageContainerHeadProps.title} shortDescription={pageContainerHeadProps.shortDescription}>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() =>
              mainTabsContext.handleAddTab({
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
         <ListContextProvider>
            <List />
         </ListContextProvider>
        </PageContainer.Boddy>
      </PageContainer.Root>
    </>
  )
}
