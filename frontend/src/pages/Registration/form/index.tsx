import { useRegistrationFormContext } from './context'
import Form from '@components/Bootstrap/Form'
import { FormType, FieldsType } from '@pages/Form/types'

import CustomCard from '@components/Bootstrap/CustomCard'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function Index() {
  const context = useRegistrationFormContext()

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
      // <ComponentA />,
      // <ComponentB />,
      // ...
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
           {'> Cadastros > Inscrições'}
        </small> 
      </>
    },
    actions: {},
    additionalComponents: [],
    styles: {
      card: { borderTop: 'none' },
      cardHeader: { border: "none", background: "#fff" },
      cardBody: { minHeight: '60vh', overflowY: "auto" as const }
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
            <Form  
              data={formProps.data} 
              actions={formProps.actions} 
              additionalComponents={formProps.additionalComponents} 
            />
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
