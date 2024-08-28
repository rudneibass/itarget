import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { useRegistrationFormContext } from './context'
import { FormType, FieldsType } from '@pages/Form/types'

import Form from '@components/Bootstrap/Form'
import CustomCard from '@components/Bootstrap/CustomCard'
import Loading from '@components/Bootstrap/Loading'

export default function Index() {
  const context = useRegistrationFormContext()
  const isLoading = context.isLoading

  const formProps = {
    data: {
      form: context.form || {} as FormType,
      fields: context.form?.fields || new Array<FieldsType> // new Array<FieldsType> or [{} as FieldsType]
    },
    actions: {
      handleSubmitAction: (inputsValues: object) => {
        context.setInputsContext(inputsValues); 
      }
    },
    additionalComponents: [
      { name: 'backButton', 
        component: 
        <button type="button" className="btn btn-outline-secondary" onClick={() => context.closeFormTab({tabId: context.activeTab })}>
          <i className="fs-7 bi-back"></i> Voltar
        </button> 
      }
    ]
  }

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
        <Tabs defaultActiveKey="tab-1" >
          <Tab 
            eventKey="tab-1" 
            title={<><i className="fs-6 bi-grid"></i> Cadastro</>} 
            style={{ 
                backgroundColor: 'white', 
                padding:"20px 5px", 
                minHeight: '55vh'
              }}
          >
            { isLoading && (<Loading />) }
            { !isLoading && ( 
              <Form  
                data={formProps.data} 
                actions={formProps.actions} 
                additionalComponents={formProps.additionalComponents} 
              />
            )}
          </Tab>
          <Tab 
            eventKey="tab-2" 
            title={ <><i className="fs-6 bi-files"></i> Anexos </> }
            style={{ 
              backgroundColor: 'white', 
              padding:"20px 5px",
              minHeight: '55vh'
            }}
           >
          </Tab>
        </Tabs>
      </CustomCard>
    </>
  )
}
