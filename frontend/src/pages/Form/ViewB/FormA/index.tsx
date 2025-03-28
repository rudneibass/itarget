import { useFormContext } from './context'
import { FormType, FieldsType, FormInputsType } from './types'

import Stack from '@components/Bootstrap/Stack'
import Form from '@components/Bootstrap/Form'
import Loading from '@components/Bootstrap/Loading'
import Button from '@components/Bootstrap/Button'
import Icon from '@components/Bootstrap/Icon'

export default function Index() {
  const context = useFormContext()
  const isLoading = context.state.isLoading

  const formProps = {
    data: {
      form: context.state.form || {} as FormType,
      fields: context.state.form?.fields || new Array<FieldsType> 
    },
    actions: {
      save: (data: FormInputsType) => {
        context.save({input: data})
      },
      alertRequiredFields: (message: string) => {
        if(context.warningAlert){
          context.warningAlert(message)
          return
        }
        if(context.errorAlert){
          context.errorAlert(message)
          return
        }
        alert(message)
      },
    },
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <Form data={formProps.data} actions={formProps.actions}>
        <Stack direction="horizontal" gap={3}>
          <Button variant="outline-secondary" onClick={() => context.closeFormTab({tabId: context.state.activeTab })}>
            <Icon name="bi bi-back" size={16} />
            &nbsp;
            Voltar
          </Button>
        </Stack>
      </Form>
    </>
  )
}
