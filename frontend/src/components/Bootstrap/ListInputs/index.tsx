import InputText from './InputText/index'
import InputTextarea from './InputTextarea/index'
import InputSelect from './InputSelect/index'
import InputSelectSearchable from './InputSelectSearchable/index'
import InputCheckbox from './InputCheckbox/index'

type ListInputsType = {
    data: Array<{
      id: string,
      rules?: string;
      options?: Array<{ option_value: string, option_text: string }>;
      attributes: Record<string, string>;
    }> | undefined,
    actions?: {
      edit?: (itemId: string) => void,
      remove?: (itemId: string) => void,
      activeDeactive?: (itemId: string) => void
    },
}

export default function ListInputs({ data, actions }: ListInputsType) {

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
                    actions={actions}
                  />
                );
              case 'textarea':
                return (
                  <InputTextarea 
                    key={index}
                    data={{ id: field.id, attributes: field.attributes, rules: field.rules }}
                    actions={actions}
                  />
                );
              case 'select':
                return (
                  <InputSelect 
                    key={index}
                    data={{ id: field.id, attributes: field.attributes, rules: field.rules }}
                    actions={actions}
                  />
                );
              case 'searchable':
                  return (
                    <InputSelectSearchable 
                      key={index}
                      data={{ id: field.id, attributes: field.attributes, rules: field.rules }}
                      actions={actions}
                    />
                  );  
              case 'checkbox':
                return (
                  <InputCheckbox
                    key={index}
                    data={{ id: field.id, attributes: field.attributes }}
                    actions={actions}
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
