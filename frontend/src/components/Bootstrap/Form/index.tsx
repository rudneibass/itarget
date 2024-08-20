import { ReactNode, FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import FormDocUsageExemples from "./FormDocUsageExemples";
import InputText from './InputText/index'

type FieldsType = {
	id: string;
  form_id: string;
  name: string;
  value?: string;
  rules?: string;
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
    },
    additionalComponents?: Array<ReactNode>
  }

export default function Index({data, actions}: FormPropsType) {
  const [inputsValues, setInputsValues] = useState({} as Record<string, string>)

  function handleSibmit(event: FormEvent<HTMLFormElement>){
    if(actions?.handleSubmitAction){
        event.preventDefault();        
        actions.handleSubmitAction(inputsValues)
    }
  }

  function handleChangeAction(input: Record<string, string >) {
    setInputsValues({...inputsValues, [input.name]: input.value})
  }

  useEffect(() => {
    let fieldValues = {}

    if(data.fields){
      data.fields.forEach((field) => {
        fieldValues = {
          ...fieldValues,
          [field.name]: field.value
        }
      })
    }

    setInputsValues(fieldValues)

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
          && data.fields.map((field, index) => 
            field.attributes?.type === 'text' && (              
                <InputText 
                  data={{id: field.id, attributes: field.attributes, rules: field.rules, value: field.value}}  
                  actions={{handleChangeAction}} 
                  key={index}
                />
            )
          )
        }
      </div>

      <div className="col-md-12 d-flex justify-content-end pt-4 mt-5 border-top" >
        <Link to="/registration" className="btn btn-outline-secondary">
          <i className="fs-7 bi-back"></i> Voltar
        </Link>
        &nbsp;
        <button type="submit" className="btn btn-secondary" style={{minWidth: '100px'}}>
          <i className="fs-7 bi-save"></i> Salvar
        </button>
      </div>

    </form>
    </>
  );
}
