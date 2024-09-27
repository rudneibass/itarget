import { ChangeEvent, FocusEvent, ReactNode, useEffect, useState } from 'react';
import { rules } from './rules'

type InputSelectPropsType = {
  data: {
    id: string,
    attributes: Record<string, string>,
    options?: Array<{ value: string, name: string }>,
    rules?: string,
    value?: string
  },
  actions?: {
    handleChangeAction?: (input: Record<string, string>) => void,
    handleClickAction?: (input: Record<string, string>) => void,
    handleBlurAction?: (input: Record<string, string>) => void,
    handleFocusInAction?: (input: Record<string, string>) => void,
    handleFocusOutAction?: (input: Record<string, string>) => void,
  },
  additionalComponents?: Array<ReactNode>
}

export default function Index({ data, actions }: InputSelectPropsType) {
  const [value, setValue] = useState<string>(data.value || '');
  const [isValidValue, setIsValidValue] = useState(true);
  const [isNotValidValueMessage, setIsNotValidValueMessage] = useState('');

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const inputValue = event.target.value;
    const inputName = event.target.name;
    const inputRules = event.target.dataset.rules;

    setValue(inputValue);

    if (actions?.handleChangeAction) {
      if (!inputRules) {
        actions.handleChangeAction({ name: inputName, value: inputValue });
      } else {
        const arrayOfRules = JSON.parse(inputRules);
        let countOfSatisfiedRules = 0;
        arrayOfRules.map((item: Record<string, string>) => {
          if (rules[item['rule']](inputValue)) {
            countOfSatisfiedRules++;
          }
        });
        if (countOfSatisfiedRules === arrayOfRules.length) {
          actions.handleChangeAction({ name: inputName, value: inputValue });
        }
      }
    }
  }

  function handleBlur(event: FocusEvent<HTMLSelectElement>) {
    const inputValue = event.target.value;
    const inputRules = event.target.dataset.rules;
    let validationMessage = '';

    if (inputRules) {
      const arrayOfRules = JSON.parse(inputRules);
      arrayOfRules.map((item: Record<string, string>) => {
        if (rules[item['rule']](inputValue)) {
          setIsValidValue(true);
        } else {
          setIsValidValue(false);
          validationMessage += `${item['message'] || 'Verifique este campo.'} | `;
        }
      });
      setIsNotValidValueMessage(validationMessage.replace(/\|([^|]*)$/, '$1'));
    }
  }

  useEffect(() => {
    if (data.value) {
      setValue(data.value);
    }
  }, [data.value]);

  return (
    <div className={`col-md-${data.attributes?.grid}`}>
      <div className="form-group mb-3">
        <label className="text-muted" htmlFor={data.attributes?.name || data.attributes?.id || ''}>
          &nbsp;{data.attributes?.label || data.attributes?.name || ''}
        </label>
        <select
          className={`form-control ${data.attributes?.class} ${!isValidValue ? 'is-invalid' : ''}`}
          id={data.attributes?.id || data.attributes?.name || ''}
          name={data.attributes?.name || data.attributes?.id || ''}
          data-rules={data.rules || ''}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          title={data.attributes?.title || ''}
          required={data.attributes?.required ? true : false}
          disabled={data.attributes?.disabled ? true : false}
          data-toggle={data.attributes?.toggle || ''} 
          data-placement={data.attributes?.placement || ''}
        >
          <option value="">Selecione uma opção</option>
          {data.options && data.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {!isValidValue && (
          <div className="invalid-feedback">
            {isNotValidValueMessage}
          </div>
        )}
      </div>
    </div>
  );
}
