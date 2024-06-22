import { LaravelPaginationLinksType } from "@services/backendApi/baseApi/types";

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
	setDataContext: ({data, cache}:{data: [], cache?:boolean}) => void,
	loading: boolean,
	setLoadingContext: ({loading}:{loading: boolean}) => void,
	thereIsNoData: boolean,
	setThereIsNoDataContext: ({ thereIsNoData }:{ thereIsNoData: boolean }) => void,
  paginationLinks: LaravelPaginationLinksType[] | undefined,
  setPaginationLinksContext: ({ paginationLinks }:{paginationLinks: LaravelPaginationLinksType[]}) => void
}