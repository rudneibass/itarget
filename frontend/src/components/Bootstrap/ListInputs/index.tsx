import { ReactNode, FormEvent, useState, useEffect } from "react"

import InputText from './InputText/index'
import InputTextarea from './InputTextarea/index'
import InputSelect from './InputSelect/index'
import InputSelectSearchable from './InputSelectSearchable/index'
import InputCheckbox from './InputCheckbox/index'

type FormPropsType = {
    data: Array<{
      id: string,
      rules?: string;
      options?: Array<{ option_value: string, option_text: string }>;
      attributes: Record<string, string>;
    }>
    actions?: {
      handleEditAction?: (itemId: string) => void,
    },
}

export default function ListInputs({data, actions}: FormPropsType) {

  function handleEditAction(itemId: string) {
    if(actions?.handleEditAction){
      actions.handleEditAction(itemId);
    }
  }

  return (
    <>
      <div className="row">
        {data
          && data.length > 0
          && data.map((field, index) => {
            switch (field.attributes?.type) {
              case 'text':
                return (
                  <InputText 
                    key={index}
                    data={{ id: field.id, attributes: field.attributes, rules: field.rules }}
                    actions={{ handleEditAction }}
                  />
                );
              case 'textarea':
                return (
                  <InputTextarea 
                    key={index}
                    data={{ id: field.id, attributes: field.attributes, rules: field.rules }}
                    actions={{ handleEditAction }}
                  />
                );
              case 'select':
                return (
                  <InputSelect 
                    key={index}
                    data={{ id: field.id, attributes: field.attributes, rules: field.rules }}
                    actions={{ handleEditAction }}
                  />
                );
              case 'searchable':
                  return (
                    <InputSelectSearchable 
                      key={index}
                      data={{ id: field.id, attributes: field.attributes, rules: field.rules }}
                      actions={{ handleEditAction }}
                    />
                  );  
              case 'checkbox':
                return (
                  <InputCheckbox
                    key={index}
                    data={{ id: field.id, attributes: field.attributes }}
                    actions={{ handleEditAction }}
                  />
                );
              default:
              return null;
            }
          })
        }
      </div>
    </>
  );
}
