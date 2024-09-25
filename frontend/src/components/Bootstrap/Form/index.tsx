import { ReactNode, FormEvent, useState, useEffect } from "react";

import FormDocUsageExemples from "./FormDocUsageExemples";
import InputText from './InputText/index'
import InputSelect from './InputSelect/index'

type FieldsType = {
	id: string;
  form_id: string;
  name: string;
  value?: string;
  rules?: string;
  options?: Array<{ value: string, label: string }>,
  attributes: Record<string, string>;
}

type FormPropsType = {
    data: {
        form: {
            id: string,
            name: string,
            code?: string,
            attributes: object,
        },
        fields?: Array<FieldsType>
    },
    actions?: {
      handleSubmitAction?: (inputsValues: object) => void
      handleAlertRequiredsFieldAction?: (alertMessage: string) => void
    },
    additionalComponents?: Array<{name: string, component: ReactNode}>
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

      return;
    }

    if(actions?.handleSubmitAction){        
        actions.handleSubmitAction(inputsValues)
    }
  }

  function handleChangeAction(input: Record<string, string >) {
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
        
        fieldValues = {
          ...fieldValues,
          [field.name]: field.value
        }

        if(field.attributes?.required){
          fieldsRequired = {
            ...fieldsRequired,
            [field.name]: true
          }
        }
      })
    }

    console.table(fieldsRequired)
    
    setInputsValues(fieldValues)
    setInputsRequired(fieldsRequired)

  }, [data])

  return (
    <>
      {!data.fields && (
        <FormDocUsageExemples />
      )}
      <form name={data.form.name} onSubmit={handleSibmit} >
        <div className="row">
          {data.fields
            && data.fields.length > 0
            && data.fields.map((field, index) => {
              switch (field.attributes?.type) {
                case 'text':
                  return (
                    <InputText 
                      data={{ id: field.id, attributes: field.attributes, rules: field.rules, value: field.value }}  
                      actions={{ handleChangeAction }} 
                      key={index}
                    />
                  );
                case 'select':
                  return (
                    <InputSelect 
                      data={{ id: field.id, attributes: field.attributes, options: field.options || [], value: field.value }}
                      actions={{ handleChangeAction }}
                      key={index}
                    />
                  );
                case 'checkbox':
                  return (
                    <input 
                      type="checkbox" 
                      name={field.name} 
                      checked={!!field.value} 
                      onChange={(e) => handleChangeAction({name: field.name, value: e.target.checked ? 'true' : 'false'})} 
                      key={index}
                    />
                  );
                default:
                  return null;
              }
            })
          }
        </div>
        <div className="col-md-12 d-flex justify-content-end pt-4 mt-5 border-top" >
          { additionalComponents && additionalComponents.map((item) => item.component ) }
          &nbsp;
          <button type="submit" className="btn btn-secondary" style={{minWidth: '100px'}}>
            <i className="fs-7 bi-save"></i> Salvar
          </button>
        </div>
      </form>
    </>
  );
}
