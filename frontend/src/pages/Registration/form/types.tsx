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

export interface RegistrationFormContextextType  {
	data: RegistrationType | undefined,
	setDataContext: ({ data, cache }: {data: RegistrationType, cache?: boolean}) => void,
	loading: boolean,
	setLoadingContext: (loading: boolean) => void,
	inputs: RegistrationFormInputsType,
	setInputsContext: (inputs: RegistrationFormInputsType) => void,
}