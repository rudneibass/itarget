import { ChangeEvent, useEffect, useState } from 'react'

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

export default function Index({ data, actions }: InputCheckboxPropsType) {
  const [checked, setChecked] = useState<boolean>(data.attributes.checked ? true : false)
  
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const inputName = event.target.name
    const isChecked = event.target.checked

    if (actions?.handleChangeAction) {
      actions.handleChangeAction({ name: inputName, value: isChecked ? 'true' : '' })
    }

    setChecked(isChecked)
  }

  useEffect(() => {
    setChecked(data.attributes.checked ? true : false)
  }, [])

  return (
    <div className={`col-md-${data.attributes?.grid || 12}`}>
      <div className="form-group mb-3 pt-3">
          <label className="form-check-label" htmlFor={data.attributes?.id}>
            <small>
              {data.attributes?.label || data.attributes?.name || ''}
            </small>
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
          />
        </div>
      </div>
    </div>
  )
}
