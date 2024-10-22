import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import CustomCard from '@components/Bootstrap/CustomCard'

import { FormContextProvider as FormAContextProvider } from './FormA/context'
import FormA from './FormA/index'

import { FormContextProvider as FormBContextProvider } from './FormB/Form/context'
import FormB from './FormB/Form/index'

export default function Index({ id }: { id?: string }) {
  const customCardProps = {
    data: {
      title:'Inscrições', 
      shortDescription: 
      <>
        &emsp;
        <i className="fs-7 bi-house"></i>
        &nbsp;&nbsp;
        <small className="text-muted" >
           {'> Cadastros > Inscrições > Novo'}
        </small> 
      </>
    },
    actions: {},
    additionalComponents: [],
    styles: {
      card: { borderTop: 'none' },
      cardHeader: { border: "none", background: "#fff" },
      cardBody: { minHeight: '60vh', overflowY: "auto" as const, position: "relative" as const }
    }
  }

  return (
    <>
      <CustomCard 
        data={customCardProps.data} 
        actions={customCardProps.actions} 
        additionalComponents={customCardProps.additionalComponents}
        styles={customCardProps.styles}
      >
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
              <FormB id={id}/>
            </FormBContextProvider>

          </Tab>

        </Tabs>
      </CustomCard>
    </>
  )
}
