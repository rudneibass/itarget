import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import CustomCard from '@components/Bootstrap/CustomCard'

import { FormContextProvider as FormAContext } from './FormA/context'
import FormA from './FormA/index'

export default function Index({ id }: { id?: string }) {

  const customCardProps = {
    data: {
      title:'Usuários', 
      shortDescription: 
      <>
        &emsp;
        <i className="fs-7 bi-house"></i>
        &nbsp;&nbsp;
        <small className="text-muted" >
           {'> Cadastros > Usuários > Cadastro'}
        </small> 
      </>
    },
    actions: {},
    additionalComponents: [],
  }

  return (
    <>
      <CustomCard 
        data={customCardProps.data} 
        actions={customCardProps.actions} 
        additionalComponents={customCardProps.additionalComponents}
      >
        <Tabs defaultActiveKey="tab-a" >
          <Tab 
            eventKey="tab-a" 
            title={<><i className="fs-6 bi-grid"></i> Cadastro</>} 
            style={{ backgroundColor: 'white', padding: '15px 5px', minHeight: '38.5vh' }}
          >
            <FormAContext id={id}>
              <FormA />
            </FormAContext>

          </Tab>
        </Tabs>
      </CustomCard>
    </>
  )
}
