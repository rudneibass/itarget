import { FormType } from "@pages/Form/types";

export type RegistrationType =  {
  id: number;
	name: string;
	email: string,
	cpf: string,
	event_id: number
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
	inputs: RegistrationFormInputsType,
	setInputsContext: (inputs: RegistrationFormInputsType) => void,
	form: FormType | undefined,
	setFormContext?: (form: FormType) => void
}