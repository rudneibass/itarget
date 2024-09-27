import { ChangeEvent, FocusEvent, ReactNode, useEffect, useState } from 'react'

type InputCheckboxPropsType = {
  data: {
    id: string,
    attributes: Record<string, string>,
    value?: boolean
  },
  actions?: {
    handleChangeAction?: (input: Record<string, boolean>) => void,
    handleClickAction?: (input: Record<string, boolean>) => void,
    handleBlurAction?: (input: Record<string, boolean>) => void,
    handleFocusInAction?: (input: Record<string, boolean>) => void,
    handleFocusOutAction?: (input: Record<string, boolean>) => void,
  },
  additionalComponents?: Array<ReactNode>
}

export default function Checkbox({ data, actions }: InputCheckboxPropsType) {
  const [checked, setChecked] = useState<boolean>(data.value || false)
  
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const inputName = event.target.name
    const isChecked = event.target.checked

    setChecked(isChecked)

    if (actions?.handleChangeAction) {
      actions.handleChangeAction({ [inputName]: isChecked })
    }
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    const inputName = event.target.name
    const isChecked = event.target.checked

    if (actions?.handleBlurAction) {
      actions.handleBlurAction({ [inputName]: isChecked })
    }
  }

  useEffect(() => {
    if (typeof data.value === 'boolean') {
      setChecked(data.value)
    }
  }, [data.value])

  return (
    <div className={`col-md-${data.attributes?.grid || 12}`}>
      <div className="form-group mb-3 pt-3">
          <label className="form-check-label" htmlFor={data.id}>
            {data.attributes?.label || data.attributes?.name || ''}
          </label><br/>
        <div className="form-check">
          <input
            type="checkbox"
            className={`form-check-input ${data.attributes?.class || ''}`}
            id={data.id}
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
