
import { useFormContext } from './context'
import { FormType, FieldsType } from './types'

import Form from '@components/Bootstrap/Form'
import Loading from '@components/Bootstrap/Loading'
import Modal from '@components/Bootstrap/Modal'

export default function Index() {
  const context = useFormContext()
  const isLoading = context.state.isLoading

  const modalProps = {
    data: {
      show: context.state.showModalForm, 
      title: 'Adicionar Campo'
    },
    actions: {
      handleCloseAction: () => {
        context.setStateContext({ showModalForm: false })
      }   
    },
    additionalComponents: []
  }

  const formProps = {
    data: {
      form: context.state.form || {} as FormType,
      fields: context.state.form?.fields || new Array<FieldsType> 
    },
    actions: {
      handleSubmitAction: (inputsValues: object) => {
        context.saveFormContext(inputsValues); 
      },
      handleAlertRequiredsFieldAction: (message: string) => {
        if(context.warningAlert){
          context.warningAlert(message)
          return
        }
        if(context.errorAlert){
          context.errorAlert(message)
          return
        }
        alert(message)
      }
    },
    additionalComponents: [
      <button 
        type="button" 
        className="btn btn-outline-secondary" 
        onClick={() => context.closeFormTab({tabId: context.state.activeTab })}
      >
        <small>
          <i className="fs-7 bi-back"></i> Voltar
        </small>
      </button> 
    ]
  }

  return (
    <>
      <Modal data={modalProps.data} actions={modalProps.actions} >
        <Loading isLoading={isLoading}/>
        <Form  
            data={formProps.data} 
            actions={formProps.actions} 
            additionalComponents={formProps.additionalComponents} 
        />
      </Modal>
    </>
  )
}
