  export interface RegistrationInterface {
  id: number;
	name: string;
	email: string,
	cpf: string,
	event_id: number
  }

  export interface RegistrationStoreUpdateInterface {
	name: string;
	email: string,
	cpf: string,
	event_id?: string
  }

  export interface ErrorsInterface {
    errors: [];
  }