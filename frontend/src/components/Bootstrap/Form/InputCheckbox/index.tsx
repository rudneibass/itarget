import { ChangeEvent, FocusEvent, useEffect, useState } from 'react'

type InputCheckboxPropsType = {
  data: {
    attributes: Record<string, string>,
    value?: boolean
  },
  actions?: {
    handleChangeAction?: (input: Record<string, string>) => void,
    handleBlurAction?: (input: Record<string, string>) => void,
  }
}

export default function Checkbox({ data, actions }: InputCheckboxPropsType) {
  const [checked, setChecked] = useState<boolean>(data.attributes.checked ? true : false)
  
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const inputName = event.target.name
    const isChecked = event.target.checked

    if (actions?.handleChangeAction) {
      actions.handleChangeAction({ [inputName]: isChecked ? '1' : '0' })
    }

    setChecked(isChecked)
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    const inputName = event.target.name
    const isChecked = event.target.checked

    if (actions?.handleBlurAction) {
      actions.handleBlurAction({ [inputName]: isChecked ? '1' : '0' })
    }
  }

  useEffect(() => {
    setChecked(data.attributes.checked ? true : false)
  }, [])

  return (
    <div className={`col-md-${data.attributes?.grid || 12}`}>
      <div className="form-group mb-3 pt-3">
          <label className="form-check-label" htmlFor={data.attributes?.id}>
            {data.attributes?.label || data.attributes?.name || ''}
          </label><br/>
        <div className="form-check">
          <input
            type="checkbox"
            className={`form-check-input ${data.attributes?.class || ''}`}
            id={data.attributes?.id}
            name={data.attributes?.name}
            required={data.attributes?.required ? true : false}
            readOnly={data.attributes?.readOnly ? true : false}
            disabled={data.attributes?.disabled ? true : false}
            checked={checked}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
    </div>
  )
}
