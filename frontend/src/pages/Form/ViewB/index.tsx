
import { Tab, Tabs }  from '@components/Bootstrap/Tabs'
import { PageContainer } from '@components/Bootstrap/PageContainer'

import { FormContextProvider as FormAContextProvider } from './FormA/context'
import FormA from './FormA/index'

import { FormContextProvider as FormBContextProvider } from './FormB/Form/context'
import FormB from './FormB/Form/index'

import { ListContextProvider as ListBContextProvider } from './FormB/List/context';
import ListB from './FormB/List/index';

export default function Index({ id }: { id?: string }) {
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
          <></>
        </PageContainer.Head>
        <PageContainer.Boddy>
        <Tabs defaultActiveKey="tab-a" >
          
          <Tab 
            eventKey="tab-a" 
            title={<><i className="fs-6 bi-grid"></i> Formulário</>} 
            style={{ backgroundColor: 'white', padding: '20px 5px', minHeight: '38.5vh' }}
          >
            <FormAContextProvider id={id}>
              <FormA />
            </FormAContextProvider>
          </Tab>

          <Tab 
            eventKey="tab-b" 
            title={<><i className="fs-6 bi-grid"></i> Campos</>} 
            style={{ backgroundColor: 'white', padding:"20px 5px", minHeight: '55vh'}}
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
