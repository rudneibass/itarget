export type RegistrationListType = {
  id: number;
  name: string;
  email: string;
  cpf: string;
  event_id: number;
};

export type ErrorsType = {
  errors: [];
};

export interface RegistrationListContextType  {
	data: RegistrationListType[] | undefined,
	setDataContext: (data: []) => void,
	loading: boolean,
	setLoadingContext: (loading: boolean) => void,
	thereIsNoData: boolean,
	setThereIsNoDataContext: (thereIsNoData: boolean) => void,
}