import { ReactNode, FormEvent, useState, useEffect } from "react"

import InputText from './InputText/index'
import InputTextarea from './InputTextarea/index'
import InputSelect from './InputSelect/index'
import InputSelectSearchable from './InputSelectSearchable/index'
import InputCheckbox from './InputCheckbox/index'

type FormPropsType = {
    data: {
        form: {
          id: string,
          name: string,
          attributes: object,
        },
        fields?:Array<{
          rules?: string;
          options?: Array<{ value: string, name: string }>;
          attributes: Record<string, string>;
        }>
    },
    actions?: {
      handleSubmitAction?: (inputsValues: object) => void
      handleAlertRequiredsFieldAction?: (alertMessage: string) => void
    },
    additionalComponents?: Array<ReactNode>
}

export default function Index({data, actions, additionalComponents}: FormPropsType) {
  const [inputsValues, setInputsValues] = useState({} as Record<string, string>)
  const [inputsRequired, setInputsRequired] = useState({} as Record<string, string>)

  function handleSibmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    if (!checkRequiredFields()) {
      if(actions?.handleAlertRequiredsFieldAction){
        actions?.handleAlertRequiredsFieldAction('Por favor, preencha os campos obrigatórios.')
      }
      if(!actions?.handleAlertRequiredsFieldAction) {
        alert('Por favor, preencha os campos obrigatórios.');
      }
    }
    
    if (checkRequiredFields()){
      if(actions?.handleSubmitAction){        
        actions.handleSubmitAction(inputsValues)
      }
    }
  }

  function handleChangeAction(input: Record<string, string>) {
    setInputsValues({...inputsValues, [input.name]: input.value})
  }

  function checkRequiredFields() {
    const requiredFieldsAreValid = Object.keys(inputsRequired).every((key) => {
      const value = inputsValues[key];
      return value !== undefined && value !== null && value.trim() !== '';
    });
  
    return requiredFieldsAreValid;
  }

  useEffect(() => {
    let fieldValues = {}
    let fieldsRequired = {}

    if(data.fields){
      data.fields.forEach((field) => {
        
        if(field.attributes?.value){
          fieldValues = {
            ...fieldValues,
            [field.attributes.name]: field.attributes.value
          }
        }

        if(field.attributes?.required){
          fieldsRequired = {
            ...fieldsRequired,
            [field.attributes.name]: true
          }
        }

      })
    }
        
    setInputsValues(fieldValues)
    setInputsRequired(fieldsRequired)

  }, [data])

  return (
    <>
      <form name={data.form.name} onSubmit={handleSibmit}>
        <div className="row" style={{ height: '48vh', overflowY:"auto" }}>
          {data.fields
            && data.fields.length > 0
            && data.fields.map((field, index) => {
              switch (field.attributes?.type) {
                case 'text':
                  return (
                    <InputText 
                      data={{
                        attributes: field.attributes, 
                        rules: field.rules,  
                      }}  
                      actions={{ handleChangeAction }} 
                      key={index}
                    />
                  );
                case 'textarea':
                  return (
                    <InputTextarea 
                      data={{
                        attributes: field.attributes, 
                        rules: field.rules,  
                      }}  
                      actions={{ handleChangeAction }} 
                      key={index}
                    />
                  );
                case 'select':
                  return (
                    <InputSelect 
                      data={{
                        attributes: field.attributes, 
                        options: field.options, 
                        rules: field.rules
                      }}
                      actions={{ handleChangeAction }}
                      key={index}
                    />
                  );
                case 'searchable':
                    return (
                      <InputSelectSearchable 
                        data={{ 
                          attributes: field.attributes, 
                          rules: field.rules,  
                        }}
                        actions={{ handleChangeAction }}
                        key={index}
                      />
                    );  
                case 'checkbox':
                  return (
                    <InputCheckbox
                        data={{ 
                          attributes: field.attributes, 
                          value: field.attributes.value ? true : false 
                        }}
                        actions={{ handleChangeAction }}
                        key={index}
                    />
                  );
                default:
                return null;
              }
            })
          }
        </div>
        <div className="col-md-12 d-flex justify-content-end pt-4 border-top" >
          { additionalComponents && additionalComponents.map((component) => component ) }
          &nbsp;
          <button type="submit" className="btn btn-secondary" style={{minWidth: '80px'}}>
            <small>
              <i className="fs-7 bi-save"></i> Salvar
            </small>
          </button>
        </div>
      </form>
    </>
  );
}
