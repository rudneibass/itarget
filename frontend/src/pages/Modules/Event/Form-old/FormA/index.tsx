
import { useRegistrationFormAContext } from './context'
import { FormType, FieldsType } from '@pages/Form/types'

import Form from '@components/Bootstrap/Form'
import Loading from '@components/Bootstrap/Loading'

export default function Index() {
  const context = useRegistrationFormAContext()
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

  return (
    <>
      { isLoading && (<Loading />) }
      { !isLoading && ( 
        <Form  
          data={formProps.data} 
          actions={formProps.actions} 
          additionalComponents={formProps.additionalComponents} 
        />
      )}
    </>
  )
}
