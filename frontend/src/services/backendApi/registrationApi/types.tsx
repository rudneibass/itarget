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