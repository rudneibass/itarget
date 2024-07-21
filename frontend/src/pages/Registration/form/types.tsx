export type RegistrationType =  {
  id: number;
	name: string;
	email: string,
	cpf: string,
	event_id: number
}

export type RegistrationStoreUpdateType = {
	name: string;
	email: string,
	cpf: string,
	event_id?: string
}

export type ErrorsType = {
  errors: [];
}

export type RegistrationFormInputsType = {
	name?: string;
	email?: string;
	cpf?: string;
	event_id?: string
  };

export type FormsType = {
	formIdentifier: string, 
	formFields: []
}

export type FieldsType = {
	id: string,
	form_id: string,
	attributes: Record<string, string>
  }

export type FormType = {
    id: string;
    name: string;
    code: string;
    attributes: object;
    fields: Array<{
      id: string;
      form_id: string;
      attributes: object;
    }>;
  };

export interface RegistrationFormContextextType  {
	data: RegistrationType | undefined,
	setDataContext: ({ data, cache }: {data: RegistrationType, cache?: boolean}) => void,
	inputs: RegistrationFormInputsType,
	setInputsContext: (inputs: RegistrationFormInputsType) => void,
	form: FormType | undefined,
	setFormContext?: (form: FormType) => void
}

