import { ReactNode, ChangeEvent, FormEvent, useState } from "react";
import FormDocUsageExemples from "./FormDocUsageExemples";
import { Link } from "react-router-dom";

type FormPropsType = {
    data: {
        form: {
            id: string,
            name: string,
            code: string,
            attributes: object,
        },
        fields?: [{
          id: string,
          form_id: string,
          attributes: Record<string, string>
      }]
    },
    actions?: {
      handleSubmitAction?: (inputsValues: object) => void
    },
    additionalComponents?: Array<ReactNode>
  }

export default function Index({data, actions}: FormPropsType) {
  const [inputsValues, setInputsValues] = useState({} as Record<string, string>)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
      const name = event.target.name;
      const value = event.target.value;
      setInputsValues({[name]: value})
  }

  function handleSibmit(event: FormEvent<HTMLFormElement>){
    if(actions?.handleSubmitAction){
        event.preventDefault();        
        actions.handleSubmitAction(inputsValues)
    }
  }

  return (
    <>
    {!data.fields && (
      <FormDocUsageExemples />
    )}
    <form name={data.form.name} onSubmit={handleSibmit} >
      <div className="row">
        {data.fields
          && data.fields.map((field, index) => (
            <div className={field.attributes?.grid || 'col-md-4'} key={index}>
              <div className="form-group mb-3">
                <label htmlFor={field.attributes?.name || field.attributes?.label || ''}>
                    {field.attributes?.name || ''}
                </label>
                <input
                  type={field.attributes?.type || 'text'}
                  className={`form-control ${field.attributes?.class}`}
                  id={field.attributes?.id || field.attributes?.name || ''}
                  name={field.attributes?.name || field.attributes?.id || ''}
                  value=''
                  onChange={handleChange}
                />
              </div>
            </div>
          ))
        }
      </div>

      <div className="col-md-12 d-flex justify-content-end pt-4 mt-5 border-top">
        <Link to="/" className="btn btn-outline-secondary">
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
