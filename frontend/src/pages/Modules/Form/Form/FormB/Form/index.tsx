
import { useFormContext } from './context'
import { FormType, FieldsType } from './types'

import Form from '@components/Bootstrap/Form'
import Loading from '@components/Bootstrap/Loading'
import Modal from '@components/Bootstrap/Modal'

import { ListContextProvider } from '../List/context';
import List from '../List'

export default function Index({ id }: { id?: string }) {
  const context = useFormContext()
  const isLoading = context.isLoading

  const formProps = {
    data: {
      form: context.form || {} as FormType,
      fields: context.form?.fields || new Array<FieldsType> 
      // new Array<FieldsType> or [{} as FieldsType]
    },
    actions: {
      handleSubmitAction: (inputsValues: object) => {
        context.setInputsContext(inputsValues); 
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
      { name: 'backButton', 
        component: 
        <button type="button" className="btn btn-outline-secondary" onClick={() => context.closeFormTab({tabId: context.activeTab })}>
          <i className="fs-7 bi-back"></i> Voltar
        </button> 
      }
    ]
  }

  const modalProps = {
    data: {
      show: context.showModalForm, 
      title: 'Adicionar Campo'
    },
    actions: {
      handleCloseAction: () => {
        context.setShowModalFormContext(false)
      }   
    },
    additionalComponents: []
  }

  return (
    <>
      <Modal data={modalProps.data} actions={modalProps.actions} >
        { isLoading && (<Loading />) }
        { !isLoading && ( 
          <Form  
              data={formProps.data} 
              actions={formProps.actions} 
              additionalComponents={formProps.additionalComponents} 
          />
        )}
      </Modal>

      <ListContextProvider formId={id}>
        <List />
      </ListContextProvider>
    </>
  )
}
