
import { Tab, Tabs }  from '@components/Bootstrap/Tabs'
import { PageContainer } from '@components/Bootstrap/PageContainer'
import Icon from '@components/Bootstrap/Icon'

import { FormContextProvider as FormAContextProvider } from './FormA/context'
import FormA from './FormA/index'

import { FormContextProvider as FormBContextProvider } from './FormB/Form/context'
import FormB from './FormB/Form/index'

import { ListContextProvider as ListBContextProvider } from './FormB/List/context';
import ListB from './FormB/List/index';

export default function Index({ id }: { id?: string }) {
  return (
    <>
      <PageContainer.Root>
        <PageContainer.Head 
          title='Formulários' 
          shortDescription={<Icon name="bi bi-house text-muted" size={16} 
          rightLabel='> Cadastros > Formulários' />}
        >
          <></>
        </PageContainer.Head>
        <PageContainer.Boddy>
        <Tabs defaultActiveKey="tab-a" >
          <Tab 
            eventKey="tab-a" 
            title={<><i className="fs-6 bi-grid"></i> Formulário</>} 
            style={{ backgroundColor: 'white', padding: '10px 5px' }}
          >
            <FormAContextProvider id={id}>
              <FormA />
            </FormAContextProvider>
          </Tab>
          <Tab 
            eventKey="tab-b" 
            title={<><i className="fs-6 bi-grid"></i> Campos</>} 
            style={{ backgroundColor: 'white', padding: '10px 5px' }}
          >
            <FormBContextProvider id={id}>
              <>
                <FormB/>
                <ListBContextProvider formId={id}>
                  <ListB />
                </ListBContextProvider>
              </>
            </FormBContextProvider>
          </Tab>

        </Tabs>
        </PageContainer.Boddy>
      </PageContainer.Root>
    </>
  )
}
