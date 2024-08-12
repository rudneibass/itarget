import { useRegistrationFormContext } from './context'
import CustomCard from '@components/Bootstrap/CustomCard'
import Form from '@components/Bootstrap/Form'
import { FormType, FieldsType } from '@pages/Form/types'

export default function Index() {
  const context = useRegistrationFormContext()

  const customCardProps = {
    data: {
      title:'Inscrições', 
      shortDescription:'Inscreva-se'
    },
    actions: {},
    additionalComponents: []
  }

  const formProps = {
    data: {
      form: context.form || {} as FormType,
      fields: context.form?.fields || [{} as FieldsType]
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

  return (
    
    <div>
       <CustomCard data={customCardProps.data} actions={customCardProps.actions}>
          <Form  
            data={formProps.data} 
            actions={formProps.actions} 
            additionalComponents={formProps.additionalComponents} 
          />        
        </CustomCard>
    </div>
  )
}
